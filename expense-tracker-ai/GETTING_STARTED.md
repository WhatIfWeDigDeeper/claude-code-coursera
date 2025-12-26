# Getting Started with Expense Tracker

Welcome! This guide will help you get the Expense Tracker application up and running in minutes.

## Prerequisites

Before you begin, make sure you have:
- **Node.js 18 or higher** installed ([Download here](https://nodejs.org/))
- **npm** (comes with Node.js) or **yarn**
- A modern web browser (Chrome, Firefox, Safari, or Edge)

## Installation Steps

### 1. Navigate to the Project Directory

```bash
cd expense-tracker-ai
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Recharts (for data visualization)
- date-fns (for date handling)

**Installation time:** ~30-60 seconds depending on your internet connection.

### 3. Start the Development Server

```bash
npm run dev
```

You should see output like:
```
▲ Next.js 14.2.18
- Local:        http://localhost:3000

✓ Ready in 1.5s
```

### 4. Open in Your Browser

Navigate to [http://localhost:3000](http://localhost:3000)

You should see the Expense Tracker application with:
- A header "Expense Tracker"
- Navigation tabs: Overview, Expenses, Analytics
- An expense entry form
- Summary dashboard cards

## Your First Expense

Let's add your first expense to see the app in action:

1. **Fill out the form:**
   - **Date**: Leave as today (pre-filled)
   - **Amount**: Enter `42.50`
   - **Category**: Select "Food"
   - **Description**: Type "Lunch at local cafe"

2. **Click "Add Expense"**

3. **See the results:**
   - Your expense appears in the system
   - Summary cards update with your new expense
   - Category breakdown shows 100% Food spending

## Add More Sample Data

To see the full power of the analytics, add a few more expenses:

```
$85.00 | Transportation | Monthly metro pass
$150.00 | Bills | Internet service
$30.00 | Entertainment | Movie tickets and popcorn
$120.00 | Shopping | New running shoes
$25.00 | Food | Grocery store run
```

After adding these, you'll see:
- Updated total spending across all summary cards
- Category breakdown with multiple categories
- Charts with meaningful data visualization

## Explore the Features

### Overview Tab
- **Add/Edit expenses** using the form
- **View summary cards** showing key metrics
- **See category breakdown** with visual bars
- **Export to CSV** button in the breakdown section

### Expenses Tab
- **View all expenses** sorted by date (newest first)
- **Filter by date range** using start/end date pickers
- **Filter by category** using the dropdown
- **Search expenses** by description or category name
- **Edit expenses** by clicking the "Edit" button
- **Delete expenses** by clicking the "Delete" button (with confirmation)

### Analytics Tab
- **Pie chart** showing spending by category
- **Bar chart** showing monthly spending trends
- Interactive tooltips on hover

## Production Build

When you're ready to deploy or test the production build:

```bash
# Build the application
npm run build

# Start the production server
npm start
```

## Common Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Create production build
npm start            # Start production server
npm run lint         # Run ESLint

# Cleanup
rm -rf .next         # Clear build cache
rm -rf node_modules  # Remove dependencies (then npm install again)
```

## Project Scripts

All available npm scripts:

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create optimized production build |
| `npm start` | Start production server (must build first) |
| `npm run lint` | Check code for linting errors |

## Troubleshooting

### Port Already in Use

If you see an error that port 3000 is already in use:

**Option 1:** Next.js will automatically try the next available port (3001, 3002, etc.)

**Option 2:** Kill the process using port 3000:
```bash
# On macOS/Linux
lsof -ti:3000 | xargs kill -9

# On Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Dependencies Not Installing

If `npm install` fails:

1. **Clear npm cache:**
   ```bash
   npm cache clean --force
   ```

2. **Delete lock file and try again:**
   ```bash
   rm package-lock.json
   npm install
   ```

3. **Use legacy peer deps (if needed):**
   ```bash
   npm install --legacy-peer-deps
   ```

### Build Errors

If the build fails:

1. **Clear the .next directory:**
   ```bash
   rm -rf .next
   npm run build
   ```

2. **Check Node version:**
   ```bash
   node --version  # Should be 18.x or higher
   ```

### Data Not Persisting

The app uses localStorage to save data. If data isn't persisting:

1. **Check browser settings:** Ensure localStorage is enabled
2. **Check incognito/private mode:** Data won't persist in private browsing
3. **Clear and restart:** Open browser console and run:
   ```javascript
   localStorage.clear()
   location.reload()
   ```

### Application Not Loading

If you see a blank page:

1. **Check browser console** (F12 or Cmd+Option+I) for errors
2. **Verify server is running** - you should see "✓ Ready" in the terminal
3. **Try a hard refresh** - Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

## Browser DevTools

Open browser developer tools to:
- **View localStorage data:** Application/Storage tab → Local Storage
- **Check for errors:** Console tab
- **Inspect network requests:** Network tab
- **Test responsive design:** Device toolbar (Cmd+Shift+M / Ctrl+Shift+M)

## Data Management

### View Your Data

Open browser console (F12) and run:
```javascript
JSON.parse(localStorage.getItem('expense_tracker_data'))
```

### Clear All Data

```javascript
localStorage.clear()
location.reload()
```

### Export Data

Use the "Export CSV" button in the Overview tab → Spending by Category section.

## What's Next?

Now that you have the app running:

1. ✅ **Add real expenses** to track your actual spending
2. ✅ **Explore filtering** to find specific expenses
3. ✅ **Check analytics** to understand spending patterns
4. ✅ **Export data** to keep backup records
5. ✅ **Test mobile view** by resizing your browser or using DevTools

## Need Help?

- 📚 **README.md**: Full project documentation
- 🚀 **QUICKSTART.md**: Feature testing guide
- 📊 **PROJECT_SUMMARY.md**: Complete technical overview

## Tips for Best Experience

### 1. Use Realistic Data
Add actual expenses from your life to get meaningful insights.

### 2. Regular Updates
Add expenses as they occur for accurate tracking.

### 3. Consistent Categories
Use the same categories for similar expenses for better analytics.

### 4. Regular Exports
Export your data monthly to keep backup records.

### 5. Check Analytics
Review the Analytics tab weekly to understand spending patterns.

## Keyboard Shortcuts

- **Tab**: Navigate between form fields
- **Enter**: Submit expense form
- **Escape**: Cancel edit mode (when editing)
- **Ctrl/Cmd + R**: Refresh page

## Mobile Usage

The app is fully responsive! To use on mobile:

1. **Desktop Development Server**: Start `npm run dev` on your computer
2. **Find IP Address**: Run `ifconfig` (Mac/Linux) or `ipconfig` (Windows)
3. **Access from Phone**: Navigate to `http://YOUR_IP:3000` on your phone
4. **Same Network Required**: Ensure phone and computer are on the same WiFi

## Performance

The app is optimized for performance:
- ⚡ **Fast loading**: Static page generation
- ⚡ **Instant updates**: Client-side state management
- ⚡ **Smooth animations**: CSS transitions
- ⚡ **Efficient re-renders**: React optimization

## Browser Compatibility

Tested and working on:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## Security Note

**Current Version:** This demo uses localStorage (client-side only).
- ✅ Safe for personal use on your own device
- ⚠️ Data is not encrypted
- ⚠️ Data is not backed up
- ⚠️ Data doesn't sync across devices

For production use with sensitive data, consider implementing:
- User authentication
- Backend database
- Encrypted storage
- Cloud backup

---

**Ready to track your expenses?** Run `npm run dev` and start managing your finances! 💰

Happy tracking! 🎉
