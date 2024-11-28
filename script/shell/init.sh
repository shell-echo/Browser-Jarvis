#!/bin/bash

# exit when any command fails
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
ROOT="$DIR/../.."
PROJECT=$(basename "$(pwd)")
VERSION="0.0.0"

rm -rf node_modules && rm -f package*
cat <<EOF > package.json
{
	"name": "$PROJECT",
	"private": true,
	"version": "$VERSION",
	"type": "module",
	"scripts": {
		"dev": "vite",
		"build": "tsc -b && vite build",
		"lint": "eslint .",
		"preview": "vite preview"
	}
}
EOF
npm install react react-dom
npm install @eslint/js @types/react @types/react-dom @vitejs/plugin-react-swc --save-dev
npm install eslint eslint-plugin-react-hooks eslint-plugin-react-refresh --save-dev
npm install eslint-plugin-import --save-dev
npm install globals typescript typescript-eslint vite --save-dev
npm install @types/node eslint-plugin-react --save-dev
npm install @types/chrome --save-dev