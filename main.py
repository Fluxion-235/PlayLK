import http.server
import socketserver
import webbrowser
from pathlib import Path

PORT = 8000
DIRECTORY = Path(__file__).resolve().parent


class PlayLKHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DIRECTORY), **kwargs)

    def end_headers(self):
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def log_message(self, format, *args):
        try:
            super().log_message(format, *args)
        except Exception:
            pass


class ThreadingPlayLKServer(socketserver.ThreadingMixIn, http.server.HTTPServer):
    allow_reuse_address = True
    daemon_threads = True


def run_server(open_browser: bool = True) -> None:
    with ThreadingPlayLKServer(("", PORT), PlayLKHandler) as httpd:
        url = f"http://localhost:{PORT}/index.html"
        print(f"PlayLK Frontend running at: {url}", flush=True)
        if open_browser:
            webbrowser.open(url)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down PlayLK server.")


if __name__ == "__main__":
    import sys
    run_server(open_browser="--no-browser" not in sys.argv)
