import { useState } from "react";
import { Shield, AlertTriangle, CheckCircle, Loader2, Scan, Globe, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ScanResult {
  is_phishing: boolean;
  confidence: number;
  risk_level: string;
  message: string;
  features: {
    url_length: number;
    domain_length: number;
    num_dots: number;
    is_https: boolean;
    has_suspicious_port: boolean;
    is_url_shortener: boolean;
    phishing_keywords_count?: number;
    brand_impersonation?: boolean;
    has_typosquatting?: boolean;
  };
  reasons?: string[];
}

const UrlScanner = () => {
  const [url, setUrl] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState("");

  const scanUrl = async () => {
    if (!url.trim()) {
      setError("Please enter a URL to scan");
      return;
    }

    setIsScanning(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url.trim() }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      console.log("Scan response:", data);

      // Validate the response structure
      if (typeof data.is_phishing !== 'boolean') {
        throw new Error("Invalid response format from server");
      }

      setResult(data);
      setError("");
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(`Failed to scan URL: ${errorMessage}. Make sure your Flask backend is running on port 5000.`);
      console.error("Scan error:", err);
    } finally {
      setIsScanning(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isScanning) {
      scanUrl();
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel?.toLowerCase()) {
      case "high":
        return "text-destructive";
      case "medium":
        return "text-yellow-500";
      case "low":
        return "text-green-500";
      default:
        return "text-muted-foreground";
    }
  };

  const getRiskBadgeClass = (riskLevel: string) => {
    switch (riskLevel?.toLowerCase()) {
      case "high":
        return "bg-destructive/20 text-destructive border-destructive/50";
      case "medium":
        return "bg-yellow-500/20 text-yellow-500 border-yellow-500/50";
      case "low":
        return "bg-green-500/20 text-green-500 border-green-500/50";
      default:
        return "bg-muted text-muted-foreground border-muted";
    }
  };

  const getResultCardClass = (isPhishing: boolean, riskLevel: string) => {
    if (isPhishing) {
      if (riskLevel?.toLowerCase() === "high") {
        return "border-destructive/50 bg-destructive/5";
      } else {
        return "border-yellow-500/50 bg-yellow-500/5";
      }
    }
    return "border-green-500/50 bg-green-500/5";
  };

  const getRiskIcon = (isPhishing: boolean, riskLevel: string) => {
    if (isPhishing) {
      if (riskLevel?.toLowerCase() === "high") {
        return <AlertTriangle className="h-6 w-6 text-destructive" />;
      } else {
        return <AlertTriangle className="h-6 w-6 text-yellow-500" />;
      }
    }
    return <CheckCircle className="h-6 w-6 text-green-500" />;
  };

  const getResultTitle = (isPhishing: boolean, riskLevel: string) => {
    if (isPhishing) {
      if (riskLevel?.toLowerCase() === "high") {
        return "⚠️ High Risk - Phishing Detected";
      } else {
        return "⚠️ Suspicious URL Detected";
      }
    }
    return "✅ URL Appears Safe";
  };

  return (
    <div className="space-y-8">
      {/* Liquid orbs for background */}
      <div className="liquid-orb liquid-orb-1" />
      <div className="liquid-orb liquid-orb-2" />
      <div className="liquid-orb liquid-orb-3" />

      {/* Scanner Input */}
      <Card className="liquid-glass liquid-glass-hover">
        <CardHeader className="text-center">
          <div className="inline-flex p-3 rounded-2xl bg-primary/20 text-primary mb-4 mx-auto">
            <Scan className="h-8 w-8" />
          </div>
          <CardTitle className="text-2xl font-bold">URL Phishing Scanner</CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter any URL to analyze it for phishing threats using advanced AI detection
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-3">
            <Input
              type="url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={handleKeyPress}
              className="scanner-input flex-1 h-12 text-base font-mono"
              disabled={isScanning}
            />
            <Button
              onClick={scanUrl}
              disabled={isScanning || !url.trim()}
              variant="hero"
              size="lg"
              className="px-8"
            >
              {isScanning ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Shield className="h-5 w-5" />
              )}
              {isScanning ? "Scanning..." : "Scan"}
            </Button>
          </div>

          {error && (
            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
              {error}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Scan Results */}
      {result && (
        <Card className={`animate-slide-up ${getResultCardClass(result.is_phishing, result.risk_level)}`}>
          <CardHeader>
            <div className="flex items-center gap-4">
              {getRiskIcon(result.is_phishing, result.risk_level)}
              <div className="flex-1">
                <CardTitle className="text-xl">
                  {getResultTitle(result.is_phishing, result.risk_level)}
                </CardTitle>
                <CardDescription className="mt-1">
                  {result.message}
                </CardDescription>
              </div>
              <Badge 
                variant="outline" 
                className={`${getRiskBadgeClass(result.risk_level)} font-mono`}
              >
                {Math.round(result.confidence * 100)}% confidence
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Risk Level */}
            <div className="flex items-center justify-between p-4 rounded-lg bg-card/30">
              <span className="font-medium">Risk Level</span>
              <Badge className={getRiskBadgeClass(result.risk_level)}>
                {result.risk_level?.toUpperCase() || "UNKNOWN"}
              </Badge>
            </div>

            {/* Detection Reasons */}
            {result.reasons && result.reasons.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Detection Reasons</h4>
                <div className="space-y-2">
                  {result.reasons.map((reason, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      <span>{reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* URL Analysis */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">URL Analysis</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Protocol</span>
                  <div className="flex items-center gap-2">
                    {result.features.is_https ? (
                      <Lock className="h-4 w-4 text-green-400" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-yellow-400" />
                    )}
                    <span className="font-mono">
                      {result.features.is_https ? "HTTPS" : "HTTP"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">URL Length</span>
                  <span className={`font-mono ${result.features.url_length > 100 ? 'text-yellow-400' : 'text-green-400'}`}>
                    {result.features.url_length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Domain Length</span>
                  <span className={`font-mono ${result.features.domain_length > 30 ? 'text-yellow-400' : 'text-green-400'}`}>
                    {result.features.domain_length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subdomains</span>
                  <span className={`font-mono ${result.features.num_dots > 3 ? 'text-yellow-400' : 'text-green-400'}`}>
                    {result.features.num_dots}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">URL Shortener</span>
                  <span className={`font-mono ${result.features.is_url_shortener ? "text-yellow-400" : "text-green-400"}`}>
                    {result.features.is_url_shortener ? "Yes" : "No"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Suspicious Port</span>
                  <span className={`font-mono ${result.features.has_suspicious_port ? "text-destructive" : "text-green-400"}`}>
                    {result.features.has_suspicious_port ? "Yes" : "No"}
                  </span>
                </div>
              </div>

              {/* Additional Analysis for Suspicious URLs */}
              {result.is_phishing && (
                <div className="grid grid-cols-2 gap-4 text-sm mt-4 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Phishing Keywords</span>
                    <span className={`font-mono ${(result.features.phishing_keywords_count || 0) > 0 ? "text-destructive" : "text-green-400"}`}>
                      {result.features.phishing_keywords_count || 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Brand Impersonation</span>
                    <span className={`font-mono ${result.features.brand_impersonation ? "text-destructive" : "text-green-400"}`}>
                      {result.features.brand_impersonation ? "Yes" : "No"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Typosquatting</span>
                    <span className={`font-mono ${result.features.has_typosquatting ? "text-destructive" : "text-green-400"}`}>
                      {result.features.has_typosquatting ? "Yes" : "No"}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Recommendations */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Recommendations</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                {result.is_phishing ? (
                  <>
                    <p className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                      Do not enter personal information on this website
                    </p>
                    <p className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                      Close this tab immediately if you haven't already
                    </p>
                    <p className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                      Report this URL to your security team or browser
                    </p>
                    <p className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                      If you've entered information, change passwords immediately
                    </p>
                  </>
                ) : (
                  <>
                    <p className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      URL appears to be legitimate
                    </p>
                    <p className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-primary" />
                      Always verify the domain before entering sensitive data
                    </p>
                    <p className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary" />
                      Look for HTTPS encryption on login pages
                    </p>
                    <p className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-primary" />
                      Be cautious of unexpected emails or links
                    </p>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UrlScanner;