{
	// The app is not currently linked to the encore.dev platform.
	// Use "encore app link" to link it.
	"id":   "",
	"lang": "typescript",
	"build": {
    		"docker": {
    			"bundle_source": true,
    			"base_image": "oven/bun:1.2.2-slim",
    		}
    	},
    "experiments": ["bun-runtime"]
}