#!/bin/bash
# ─────────────────────────────────────────────────────────────────────────────
# MySchool — Firebase Auto Deploy Script
# Run this ONE TIME from your terminal to deploy rules and indexes automatically
# Usage: bash deploy.sh
# ─────────────────────────────────────────────────────────────────────────────

echo ""
echo "🏫 MySchool — Firebase Deployment"
echo "─────────────────────────────────"

# Check firebase CLI is installed
if ! command -v firebase &> /dev/null; then
  echo "📦 Installing Firebase CLI..."
  npm install -g firebase-tools
fi

# Login check
echo ""
echo "🔑 Checking Firebase login..."
firebase login --no-localhost 2>/dev/null || firebase login

# Set project (replace myschool-b46c8 with your actual Firebase project ID)
echo ""
echo "🔗 Linking to Firebase project..."
firebase use --add

# Deploy Firestore rules
echo ""
echo "🔒 Deploying Firestore security rules..."
firebase deploy --only firestore:rules
echo "✅ Rules deployed"

# Deploy Firestore indexes
echo ""
echo "📋 Deploying Firestore indexes (this creates all composite indexes)..."
firebase deploy --only firestore:indexes
echo "✅ Indexes deployed"

echo ""
echo "🎉 Done! Firebase is fully configured."
echo ""
echo "NOTE: Indexes take 2–5 minutes to build in Firebase."
echo "You can monitor them at:"
echo "https://console.firebase.google.com → Firestore → Indexes"
echo ""
