import { Shield, Scan, AlertTriangle, Zap, Database, Lock, Globe, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  const features = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Real-Time Detection",
      description: "Advanced AI algorithms detect phishing attempts instantly with 99.9% accuracy",
      color: "text-primary",
    },
    {
      icon: <Scan className="h-8 w-8" />,
      title: "Deep URL Analysis",
      description: "Comprehensive scanning of URLs, domain reputation, and content analysis",
      color: "text-secondary",
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Threat Intelligence",
      description: "Powered by global threat databases and machine learning models",
      color: "text-accent",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning Fast",
      description: "Get results in milliseconds with our optimized detection engine",
      color: "text-primary",
    },
  ];

  const stats = [
    { label: "Threats Blocked", value: "2.3M+", color: "text-primary" },
    { label: "Accuracy Rate", value: "99.9%", color: "text-secondary" },
    { label: "Users Protected", value: "50K+", color: "text-accent" },
    { label: "Response Time", value: "<50ms", color: "text-primary" },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Liquid orbs for background */}
      <div className="liquid-orb liquid-orb-1" />
      <div className="liquid-orb liquid-orb-2" />
      <div className="liquid-orb liquid-orb-3" />

      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="space-y-8 animate-slide-up">
            {/* Main Heading */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full liquid-glass border border-primary/30 text-sm font-mono text-muted-foreground mb-6">
                <Cpu className="h-4 w-4 text-primary animate-glow-pulse" />
                Next-Generation Cybersecurity
              </div>
              
              <h1 className="text-5xl md:text-8xl font-bold font-primary leading-tight">
                <span className="gradient-text">Phishing</span><br />
                <span className="text-foreground">Detector</span>
              </h1>
              
              <p className="text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
                Advanced AI-powered protection against phishing attacks. Detect, analyze, and block threats in real-time.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <Link to="/scanner">
                <Button variant="hero" size="xl" className="animate-float group">
                  <Scan className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                  Start Scanning URLs
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="text-center animate-scale-in liquid-glass p-4 rounded-2xl"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`text-2xl md:text-4xl font-bold font-mono ${stat.color} mb-2`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-float opacity-30">
          <Shield className="h-16 w-16 text-primary" />
        </div>
        <div className="absolute bottom-20 right-10 animate-float opacity-30" style={{ animationDelay: '1s' }}>
          <Lock className="h-12 w-12 text-secondary" />
        </div>
        <div className="absolute top-1/2 left-20 animate-float opacity-20" style={{ animationDelay: '2s' }}>
          <AlertTriangle className="h-10 w-10 text-accent" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 animate-slide-up">
            <h2 className="text-3xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Advanced Protection</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Cutting-edge technology meets intuitive design to deliver unparalleled security
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={feature.title}
                className="liquid-glass liquid-glass-hover animate-scale-in group"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`inline-flex p-4 rounded-2xl bg-card/50 ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Scan Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="liquid-glass liquid-glass-hover p-12 animate-slide-up">
            <CardHeader>
              <CardTitle className="text-3xl md:text-5xl font-bold mb-6">
                Ready to <span className="gradient-text">Scan</span> a URL?
              </CardTitle>
              <CardDescription className="text-xl text-muted-foreground mb-8">
                Get instant protection with our advanced phishing detection system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/scanner">
                <Button variant="futuristic" size="xl">
                  <Shield className="h-6 w-6" />
                  Open URL Scanner
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;