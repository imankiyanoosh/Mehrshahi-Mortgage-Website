import http.server
import socketserver
import os

# Change to the project directory
os.chdir("D:/AI Coder/VS Code/Mortgage/Mehrshahi-Mortgage-Website")

# Set up the server
PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()
    
    def translate_path(self, path):
        # Default to index.html for root path
        if path == "/":
            return "index.html"
        return super().translate_path(path)

Handler = MyHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Server running at http://localhost:{PORT}/")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
