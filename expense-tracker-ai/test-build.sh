#!/bin/bash

echo "🧪 Testing Expense Tracker Build..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
  echo "❌ node_modules not found. Run 'npm install' first."
  exit 1
fi
echo "✅ Dependencies installed"

# Check TypeScript compilation
echo ""
echo "🔍 Checking TypeScript..."
npx tsc --noEmit
if [ $? -eq 0 ]; then
  echo "✅ TypeScript compilation successful"
else
  echo "❌ TypeScript errors found"
  exit 1
fi

# Check build
echo ""
echo "🏗️  Building project..."
npm run build > /dev/null 2>&1
if [ $? -eq 0 ]; then
  echo "✅ Build successful"
else
  echo "❌ Build failed"
  exit 1
fi

echo ""
echo "🎉 All tests passed!"
echo ""
echo "To start the application:"
echo "  npm run dev"
echo ""
echo "Then open http://localhost:3000 in your browser"
