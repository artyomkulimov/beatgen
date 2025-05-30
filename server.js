const { createServer } = require("https");
const { parse } = require("url");
const next = require("next");
const fs = require("fs");
const path = require("path");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

// Check if certificate files exist
const keyPath = path.join(__dirname, "certs", "127.0.0.1+2-key.pem");
const certPath = path.join(__dirname, "certs", "127.0.0.1+2.pem");

if (!fs.existsSync(keyPath) || !fs.existsSync(certPath)) {
	console.error("❌ SSL certificates not found!");
	console.error("Expected files:");
	console.error("  - certs/127.0.0.1+2-key.pem");
	console.error("  - certs/127.0.0.1+2.pem");
	console.error("");
	console.error("Please run:");
	console.error("  mkcert 127.0.0.1 localhost ::1");
	console.error("  mv 127.0.0.1+2*.pem certs/");
	process.exit(1);
}

const httpsOptions = {
	key: fs.readFileSync(keyPath),
	cert: fs.readFileSync(certPath),
};

app.prepare().then(() => {
	createServer(httpsOptions, async (req, res) => {
		try {
			const parsedUrl = parse(req.url, true);
			await handle(req, res, parsedUrl);
		} catch (err) {
			console.error("Error occurred handling", req.url, err);
			res.statusCode = 500;
			res.end("internal server error");
		}
	})
		.once("error", (err) => {
			console.error(err);
			process.exit(1);
		})
		.listen(port, () => {
			console.log(`🚀 Ready on https://${hostname}:${port}`);
			console.log(`📁 Using certificates from certs/ directory`);
		});
});
