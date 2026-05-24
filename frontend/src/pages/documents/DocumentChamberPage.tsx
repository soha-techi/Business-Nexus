import React, { useState, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import {
  FileText,
  Upload,
  CheckCircle,
  AlertCircle,
  Clock,
  Trash2,
  Check,
  ShieldCheck,
} from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card, CardContent } from "../../components/ui/Card";

interface DocumentItem {
  id: string;
  name: string;
  type: string;
  size: string;
  status: "Draft" | "In Review" | "Signed";
  date: string;
  savedSignatureUrl?: string;
}

export const DocumentChamberPage: React.FC = () => {
  // Is bar strict reference element ensure karne ke liye HTMLCanvasElement pattern set kiya hai
  const sigPad = useRef<SignatureCanvas | null>(null);

  const [documents, setDocuments] = useState<DocumentItem[]>([
    {
      id: "1",
      name: "Seed_Funding_Agreement_TermSheet.pdf",
      type: "PDF",
      size: "2.4 MB",
      status: "In Review",
      date: "May 22, 2026",
    },
    {
      id: "2",
      name: "NDA_Nexus_Partners.pdf",
      type: "PDF",
      size: "1.1 MB",
      status: "Draft",
      date: "May 22, 2026",
    },
  ]);
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(
    documents[0],
  );

  const clearSignature = () => {
    if (sigPad.current) {
      sigPad.current.clear();
    }
  };

  const saveSignature = () => {
    if (sigPad.current) {
      // Direct raw data check wrapper taake system empty trace na kare
      const canvasInstance = sigPad.current.getCanvas();

      if (!canvasInstance || sigPad.current.isEmpty()) {
        alert("Yar pehle verification pad par properly signature draw karo!");
        return;
      }

      // Safe image formatting capturing
      const signatureDataUrl = canvasInstance.toDataURL("image/png");

      if (selectedDoc) {
        const updatedDoc: DocumentItem = {
          ...selectedDoc,
          status: "Signed",
          savedSignatureUrl: signatureDataUrl,
        };

        setDocuments((prev) =>
          prev.map((doc) => (doc.id === selectedDoc.id ? updatedDoc : doc)),
        );
        setSelectedDoc(updatedDoc);
      }
    } else {
      alert("Signature interface initialize nahi ho saka. Refresh template!");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Signed":
        return (
          <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full">
            <CheckCircle className="w-3 h-3" /> Signed
          </span>
        );
      case "In Review":
        return (
          <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 rounded-full">
            <Clock className="w-3 h-3" /> In Review
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 rounded-full">
            <AlertCircle className="w-3 h-3" /> Draft
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 md:p-6 text-gray-900 dark:text-white">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Document Chamber</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          Review investment deals, contracts, and execute secure digital
          signatures.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Side */}
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-6 text-center hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors cursor-pointer bg-white dark:bg-gray-800">
            <Upload className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-sm font-semibold">Upload Deal Document</p>
            <p className="text-xs text-gray-400 mt-1">
              Drag & drop or browse PDF up to 10MB
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-2">
              Available Contracts
            </h2>
            {documents.map((doc) => (
              <div
                key={doc.id}
                onClick={() => setSelectedDoc(doc)}
                className={`p-3.5 border rounded-xl cursor-pointer transition-all ${selectedDoc?.id === doc.id ? "border-blue-500 bg-blue-50/30 dark:bg-blue-900/10" : "border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"}`}
              >
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{doc.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {doc.size} • {doc.date}
                    </p>
                    <div className="mt-2 flex">
                      {getStatusBadge(doc.status)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side */}
        <div className="lg:col-span-2">
          {selectedDoc ? (
            <Card className="shadow-sm border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
              <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-900/20">
                <div>
                  <h3 className="font-bold text-base">{selectedDoc.name}</h3>
                  <p className="text-xs text-gray-400">
                    Cryptographic Preview Mode
                  </p>
                </div>
                {getStatusBadge(selectedDoc.status)}
              </div>

              <CardContent className="p-6 space-y-6">
                <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 min-h-[260px] font-serif shadow-inner text-sm leading-relaxed text-gray-700 dark:text-gray-300 relative">
                  <div className="border-b dark:border-gray-700 pb-3 mb-4 flex items-center justify-between font-sans">
                    <span className="font-bold uppercase text-xs tracking-widest text-blue-600 flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4" /> Section 1.2: Capital
                      Injection
                    </span>
                    <span className="text-xs text-gray-400">v1.0.4</span>
                  </div>
                  <p className="mb-3">
                    The Investor hereby commits to provide equity financing to
                    the Company in an aggregate amount specified in the
                    transaction registry guidelines.
                  </p>
                  <p className="mb-6">
                    Upon execution of this digital signature terminal interface,
                    both the Entrepreneur and the verification node confirm
                    platform rules compliance protocols.
                  </p>

                  {/* Real Signature Rendering Box */}
                  {selectedDoc.savedSignatureUrl && (
                    <div className="mt-6 border-t pt-4 border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-end">
                      <p className="text-xs font-sans text-gray-400 uppercase tracking-wider mb-1">
                        Digitally Witnessed By User
                      </p>
                      <div className="bg-white p-2 rounded-lg border border-gray-200 shadow-sm inline-block max-w-[180px]">
                        <img
                          src={selectedDoc.savedSignatureUrl}
                          alt="User Signature"
                          className="h-10 w-auto object-contain block"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold tracking-wide text-gray-500 uppercase">
                    E-Signature Verification Pad
                  </h4>

                  {selectedDoc.status === "Signed" ? (
                    <div className="p-6 bg-green-50/50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-xl flex items-center gap-3 text-green-700 dark:text-green-400 animate-fadeIn">
                      <div className="w-9 h-9 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600">
                        <Check className="w-5 h-5 stroke-[3]" />
                      </div>
                      <div>
                        <p className="font-bold text-sm">
                          Contract Legally Locked & Signed
                        </p>
                        <p className="text-xs opacity-80">
                          Execution hash verified and embedded into document
                          canvas layout view.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {/* Fixed Inner Dimensions Wrapper layout */}
                      <div className="border border-gray-200 dark:border-gray-700 rounded-xl bg-white overflow-hidden shadow-sm">
                        <SignatureCanvas
                          ref={sigPad}
                          penColor="#2563eb"
                          canvasProps={{
                            width: 700,
                            height: 150,
                            className:
                              "max-w-full w-full h-36 bg-white cursor-crosshair block",
                          }}
                        />
                      </div>
                      <div className="flex gap-2 justify-end">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={clearSignature}
                          className="flex items-center gap-1"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" /> Clear Pad
                        </Button>
                        <Button
                          type="button"
                          variant="primary"
                          size="sm"
                          onClick={saveSignature}
                        >
                          Apply Signature
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="text-center py-12 text-gray-400">
              Select a contract from the list to sign.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
