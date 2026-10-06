import Foundation
import Vision
import AppKit
let args = CommandLine.arguments
let input = URL(fileURLWithPath: args[1])
let output = URL(fileURLWithPath: args[2])
let files = try FileManager.default.contentsOfDirectory(at: input, includingPropertiesForKeys:nil).filter {$0.pathExtension == "png"}.sorted {$0.lastPathComponent < $1.lastPathComponent}
var result: [String: [[String: Any]]] = [:]
for file in files {
 let request = VNRecognizeTextRequest()
 request.recognitionLevel = .accurate
 request.recognitionLanguages = ["en-US", "zh-Hans", "zh-Hant"]
 request.usesLanguageCorrection = false
 try VNImageRequestHandler(url:file).perform([request])
 let rows: [[String: Any]] = (request.results ?? []).compactMap { observation in
  guard let text = observation.topCandidates(1).first else { return nil }
  return ["text":text.string,"confidence":text.confidence,"x":observation.boundingBox.minX,"y":1-observation.boundingBox.maxY,"w":observation.boundingBox.width,"h":observation.boundingBox.height]
 }
 result[file.deletingPathExtension().lastPathComponent] = rows
}
let data = try JSONSerialization.data(withJSONObject:result,options:[.prettyPrinted,.sortedKeys])
try data.write(to:output)
print("OCR completed: \(files.count) pages")
