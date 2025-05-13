import {
  AimOutlined,
  ArrowRightOutlined,
  CheckCircleOutlined,
  DownloadOutlined,
  EyeOutlined,
  GithubOutlined,
  HeartOutlined,
  MobileOutlined,
  PlusOutlined,
  RocketOutlined,
  StarOutlined,
  SyncOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { Badge, Button, Card, Divider, Input, message } from "antd";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const Landing = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const ctaRef = useRef(null);
  const [inputUrl, setInputUrl] = useState("");
  const [isValidUrl, setIsValidUrl] = useState(true);

  // URL validation function
  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      // Check if it's a domain without protocol
      const domainPattern =
        /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      return domainPattern.test(url);
    }
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setInputUrl(url);
    if (url) {
      setIsValidUrl(validateUrl(url));
    } else {
      setIsValidUrl(true);
    }
  };

  useEffect(() => {
    // Ensure elements are visible by default (fallback)
    gsap.set(
      ".hero-title, .hero-subtitle, .hero-input, .hero-features, .feature-card, .cta-section",
      {
        opacity: 1,
        y: 0,
      }
    );

    // Hero animations
    const tl = gsap.timeline();
    tl.from(".hero-title", {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: "power3.out",
    })
      .from(
        ".hero-subtitle",
        { duration: 0.8, y: 30, opacity: 0, ease: "power3.out" },
        "-=0.5"
      )
      .from(
        ".hero-input",
        { duration: 0.8, y: 30, opacity: 0, ease: "power3.out" },
        "-=0.3"
      )
      .from(
        ".hero-features",
        { duration: 0.8, y: 30, opacity: 0, stagger: 0.1, ease: "power3.out" },
        "-=0.3"
      );

    // Features animation on scroll
    gsap.set(".feature-card", { opacity: 1 }); // Ensure cards are visible by default
    gsap.from(".feature-card", {
      scrollTrigger: {
        trigger: featuresRef.current,
        start: "top 90%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
      duration: 0.8,
      y: 50,
      opacity: 0,
      stagger: 0.2,
      ease: "power3.out",
    });

    // CTA animation on scroll
    gsap.set(".cta-section", { opacity: 1 }); // Ensure CTA is visible by default
    gsap.from(".cta-section", {
      scrollTrigger: {
        trigger: ctaRef.current,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
      duration: 1,
      y: 50,
      opacity: 0,
      ease: "power3.out",
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleGetStarted = (url) => {
    let finalUrl = url || inputUrl;

    if (!finalUrl) {
      navigate("/app");
      return;
    }

    if (!validateUrl(finalUrl)) {
      message.error("Please enter a valid URL");
      return;
    }

    // Add protocol if missing
    if (!finalUrl.startsWith("http://") && !finalUrl.startsWith("https://")) {
      finalUrl = "https://" + finalUrl;
    }

    navigate(`/app?url=${encodeURIComponent(finalUrl)}`);
  };

  const features = [
    {
      icon: <MobileOutlined className="text-2xl text-blue-500" />,
      title: "Multi-Device Preview",
      description:
        "Test your website on iPhone, Android, iPad, and desktop devices simultaneously. See how your design looks across all popular screen sizes instantly.",
      status: "available",
    },
    {
      icon: <PlusOutlined className="text-2xl text-green-500" />,
      title: "Custom Screen Sizes",
      description:
        "Add your own custom device dimensions and test unique viewport sizes. Perfect for testing specific client requirements or unusual screen ratios.",
      status: "available",
    },
    {
      icon: <ThunderboltOutlined className="text-2xl text-purple-500" />,
      title: "Lightning Fast",
      description:
        "Optimized rendering engine ensures smooth performance even with multiple device previews. No lag, just instant responsive testing.",
      status: "available",
    },
    {
      icon: <SyncOutlined className="text-2xl text-orange-500" />,
      title: "Scroll Synchronization",
      description:
        "Sync scrolling across all device previews for seamless testing. Navigate once, see changes everywhere simultaneously.",
      status: "coming-soon",
    },
    {
      icon: <AimOutlined className="text-2xl text-red-500" />,
      title: "Click Synchronization",
      description:
        "Synchronized clicking and interactions across all viewports. Test user flows across all devices with single interactions.",
      status: "coming-soon",
    },
    {
      icon: <EyeOutlined className="text-2xl text-cyan-500" />,
      title: "Real-Time Updates",
      description:
        "Watch your responsive designs update in real-time as you make changes. Perfect for development and client presentations.",
      status: "available",
    },
    {
      icon: <CheckCircleOutlined className="text-2xl text-indigo-500" />,
      title: "No Sign-Up Required",
      description:
        "Start testing immediately without creating accounts or installing software. Just paste your URL and preview instantly.",
      status: "available",
    },
    {
      icon: <HeartOutlined className="text-2xl text-pink-500" />,
      title: "Open Source",
      description:
        "Built by developers, for developers. Contribute, suggest features, or fork the project. Your feedback shapes our roadmap.",
      status: "available",
    },
    {
      icon: <RocketOutlined className="text-2xl text-teal-500" />,
      title: "Browser Extension",
      description:
        "One-click testing from any webpage. Test the current page instantly without copying URLs or switching tabs.",
      status: "coming-soon",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div ref={heroRef} className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <h1 className="hero-title text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              Preview Your Website
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Across All Devices
              </span>
            </h1>

            <p className="hero-subtitle text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Test your responsive designs on multiple devices simultaneously.
              Paste your URL and see the magic happen ✨
            </p>

            <div className="hero-input max-w-2xl mx-auto mb-16">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  size="large"
                  placeholder="Paste your URL here (e.g., https://your-website.com)"
                  value={inputUrl}
                  onChange={handleUrlChange}
                  status={!isValidUrl ? "error" : ""}
                  className="text-lg py-4 px-6 rounded-xl border-2 border-gray-200 focus:border-blue-500 shadow-lg"
                  suffix={
                    <Button
                      type="primary"
                      size="large"
                      icon={<ArrowRightOutlined />}
                      onClick={() => handleGetStarted(inputUrl)}
                      disabled={inputUrl && !isValidUrl}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 border-none rounded-lg px-8 h-12 flex items-center justify-center hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg disabled:opacity-50"
                    >
                      Try Now
                    </Button>
                  }
                />
              </div>

              {!isValidUrl && inputUrl && (
                <div className="mt-2 text-red-500 text-sm text-center">
                  Please enter a valid URL (e.g., google.com or
                  https://google.com)
                </div>
              )}

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="large"
                  icon={<DownloadOutlined />}
                  className="rounded-lg px-8 h-12 border-2 border-gray-300 hover:border-blue-500 transition-colors"
                  disabled
                >
                  Browser Extension
                </Button>
                <Badge count="Coming Soon" color="orange" offset={[10, -5]}>
                  <span className="text-sm text-gray-500">
                    Extension is in progress 🚧
                  </span>
                </Badge>
              </div>
            </div>

            <div className="hero-features grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MobileOutlined className="text-2xl text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">50+ Devices</h3>
                <p className="text-sm text-gray-600">
                  Latest mobile & tablet sizes
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <PlusOutlined className="text-2xl text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Custom Sizes</h3>
                <p className="text-sm text-gray-600">Add your own dimensions</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <RocketOutlined className="text-2xl text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Fast & Free</h3>
                <p className="text-sm text-gray-600">
                  No registration required
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <HeartOutlined className="text-2xl text-red-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Open Source</h3>
                <p className="text-sm text-gray-600">
                  Built with ❤️ by community
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div ref={featuresRef} className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Modern Developers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to test responsive designs effectively
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="feature-card h-full hover:shadow-2xl transition-all duration-300 border-0 rounded-2xl bg-white/80 backdrop-blur-sm hover:-translate-y-2"
                bodyStyle={{ padding: "2rem" }}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center">
                      {feature.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {feature.title}
                      </h3>
                      {feature.status === "coming-soon" && (
                        <Badge count="Soon" color="orange" />
                      )}
                      {feature.status === "available" && (
                        <Badge count="✓" color="green" />
                      )}
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div ref={ctaRef} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="cta-section bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-6">
              Open Source & Community Driven
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              DevicePreview is open source and built by the community. Want a
              new feature? Open an issue! Want to contribute? Grab an issue and
              start coding! Even a single ⭐ means a lot to us.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="large"
                icon={<GithubOutlined />}
                className="bg-white text-gray-900 border-none rounded-xl px-8 h-14 font-semibold hover:bg-gray-100 transition-colors"
                href="https://github.com/onlyVishesh/DevicePreview"
                target="_blank"
              >
                View on GitHub
              </Button>

              <Button
                size="large"
                icon={<StarOutlined />}
                className="bg-transparent text-white border-2 border-white rounded-xl px-8 h-14 font-semibold hover:bg-white hover:text-gray-900 transition-colors"
                href="https://github.com/onlyVishesh/DevicePreview"
                target="_blank"
              >
                Give us a Star ⭐
              </Button>
            </div>

            <Divider className="border-white/20 my-8" />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">50+</div>
                <div className="opacity-80">Device Presets</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">100%</div>
                <div className="opacity-80">Free & Open</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">∞</div>
                <div className="opacity-80">Custom Sizes</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 mb-4">
            Made with ❤️ by{" "}
            <a href="https://www.github.com/onlyVishesh" target="_blank">
              onlyVishesh
            </a>
          </p>
          <p className="text-gray-500 text-sm">
            DevicePreview © 2025 - Built for developers, by a developer
          </p>
        </div>
      </div>
    </div>
  );
};

Landing.propTypes = {};

export default Landing;
