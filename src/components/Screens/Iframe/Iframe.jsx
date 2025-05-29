import { Button } from "antd";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

const Iframe = ({ screen, url }) => {
  const iframeRef = useRef(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUrl, setCurrentUrl] = useState(url);
  const id = `${screen?.deviceName}+${screen?.width}`;

  useEffect(() => {
    // Reset URL when original URL changes
    setCurrentUrl(url);
  }, [url]);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    // Reset state when URL changes
    setHasError(false);
    setIsLoading(true);

    let loadTimeout;
    let hasLoadEventFired = false;

    const handleLoad = () => {
      hasLoadEventFired = true;
      clearTimeout(loadTimeout);

      // Add a small delay to allow content to render
      setTimeout(() => {
        try {
          // Check if we can access the iframe's content
          const doc = iframe.contentDocument || iframe.contentWindow?.document;
          const iframeUrl = iframe.contentWindow?.location?.href;

          // If we can access the document, it loaded successfully
          if (doc && iframeUrl) {
            setIsLoading(false);
            setHasError(false);
            return;
          }
        } catch {
          // Cross-origin restrictions - but iframe might still be showing content
          console.log(
            "Cross-origin access restricted, but iframe may be displaying content"
          );
        }

        // If we reach here, assume it's loaded (can't verify due to cross-origin)
        setIsLoading(false);
        setHasError(false);
      }, 100);
    };

    const handleError = () => {
      hasLoadEventFired = true;
      clearTimeout(loadTimeout);
      setIsLoading(false);
      setHasError(true);
    };

    // Set up event listeners
    iframe.addEventListener("load", handleLoad);
    iframe.addEventListener("error", handleError);

    // Timeout to detect if iframe fails to load (CSP or other issues)
    loadTimeout = setTimeout(() => {
      if (!hasLoadEventFired) {
        // Try to detect if it's specifically a CSP issue
        try {
          const doc = iframe.contentDocument || iframe.contentWindow?.document;
          if (!doc) {
            setHasError(true);
          } else {
            setHasError(false);
          }
        } catch (error) {
          if (
            error.message.includes("frame") ||
            error.message.includes("ancestor")
          ) {
            // CSP frame-ancestors restriction
          } else {
            // Cross-origin restriction
          }
          setHasError(true);
        }
        setIsLoading(false);
      }
    }, 3000); // Reduced timeout for faster feedback

    return () => {
      clearTimeout(loadTimeout);
      iframe.removeEventListener("load", handleLoad);
      iframe.removeEventListener("error", handleError);
    };
  }, [currentUrl]);

  const openInNewTab = () => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (hasError) {
    const isGitHub = url.includes("github.com");
    const isProtectedSite =
      isGitHub ||
      url.includes("google.com") ||
      url.includes("facebook.com") ||
      url.includes("twitter.com");

    return (
      <div
        className="flex flex-col items-center justify-center border border-gray-300 bg-gray-50 rounded-lg relative"
        style={{ width: screen?.width, height: screen?.height }}
      >
        <div className="text-center p-4">
          <div className="text-red-500 mb-2">
            <svg
              className="w-12 h-12 mx-auto mb-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">
            Cannot display in frame
          </h3>
          <p className="text-xs text-gray-600 mb-3">
            {isProtectedSite
              ? "This website has security policies that prevent iframe embedding"
              : "This website prevents embedding due to security policies"}
          </p>
          <Button
            type="primary"
            size="small"
            onClick={openInNewTab}
            className="text-xs"
          >
            Open in New Tab
          </Button>
        </div>
        <div className="absolute top-2 left-2 text-xs text-gray-500 bg-white px-2 py-1 rounded">
          {screen?.deviceName}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{ width: screen?.width, height: screen?.height }}
      className="relative"
    >
      {isLoading && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-gray-50 border border-gray-300 rounded-lg"
          style={{ width: screen?.width, height: screen?.height }}
        >
          <div className="text-center">
            <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
            <p className="text-xs text-gray-600">Loading...</p>
          </div>
        </div>
      )}
      <iframe
        ref={iframeRef}
        width={screen?.width}
        height={screen?.height}
        src={currentUrl}
        title={screen?.deviceName}
        id={id}
        className={`border border-gray-300 rounded-lg ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        sandbox="allow-scripts allow-forms allow-same-origin allow-presentation allow-orientation-lock allow-modals allow-popups-to-escape-sandbox allow-pointer-lock allow-popups"
        allow="accelerometer; autoplay; camera; encrypted-media; gyroscope; picture-in-picture; web-share"
      />
    </div>
  );
};

Iframe.propTypes = {
  screen: PropTypes.shape({
    deviceName: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
  url: PropTypes.string.isRequired,
};

export default Iframe;
