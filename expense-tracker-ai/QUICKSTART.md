# Quick Start Guide

## Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Quick Feature Test

Once the app is running, test all features:

### 1. Add an Expense
- Click on the **Overview** tab (default)
- Fill out the form:
  - Date: Today's date (pre-filled)
  - Amount: 50.00
  - Category: Food
  - Description: Groceries at Whole Foods
- Click **Add Expense**
- ✅ You should see the expense appear and summary cards update

### 2. View Dashboard
- Check the **Summary Cards** showing:
  - Total Spending
  - This Month spending
  - Top Category
- Scroll down to see **Spending by Category** breakdown
- ✅ All stats should reflect your new expense

### 3. Add More Expenses
Add a few more to see better analytics:
```
$30.00 - Transportation - Uber ride
$120.00 - Bills - Electric bill
$45.00 - Entertainment - Movie tickets
$200.00 - Shopping - New headphones
```

### 4. Filter Expenses
- Go to the **Expenses** tab
- Try filtering:
  - By date range
  - By category (select "Food" or "Shopping")
  - By search term (type "Uber")
- Click **Clear Filters** to reset
- ✅ List should update based on filters

### 5. Edit an Expense
- In the **Expenses** tab, click **Edit** on any expense
- Modify the details (change amount or description)
- Click **Update Expense**
- ✅ Changes should be saved and reflected everywhere

### 6. Delete an Expense
- Click **Delete** on any expense
- Confirm the deletion
- ✅ Expense should be removed from the list

### 7. View Analytics
- Go to the **Analytics** tab
- View the **Pie Chart** showing category distribution
- View the **Bar Chart** showing monthly trends
- ✅ Charts should display all your expenses visually

### 8. Export Data
- Go back to **Overview** tab
- Scroll to "Spending by Category"
- Click **Export CSV**
- ✅ A CSV file should download with all expenses

### 9. Test Data Persistence
- Refresh the page (press F5 or Cmd+R)
- ✅ All your expenses should still be there (saved in localStorage)

### 10. Test Responsive Design
- Resize your browser window or open DevTools (F12)
- Toggle device toolbar to view mobile layout
- ✅ Layout should adapt beautifully to different screen sizes

## Features Checklist

- [x] Add expenses with validation
- [x] Edit existing expenses
- [x] Delete expenses (with confirmation)
- [x] View all expenses sorted by date
- [x] Filter by date range
- [x] Filter by category
- [x] Search expenses
- [x] Dashboard with summary cards
- [x] Category breakdown with percentages
- [x] Pie chart visualization
- [x] Bar chart for monthly trends
- [x] Export to CSV
- [x] Data persistence (localStorage)
- [x] Responsive design
- [x] Loading states
- [x] Form validation
- [x] Visual feedback

## Troubleshooting

**Port already in use?**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
# Then restart dev server
npm run dev
```

**Clear all data?**
Open browser console (F12) and run:
```javascript
localStorage.clear()
location.reload()
```

**Build for production:**
```bash
npm run build
npm start
```

## Next Steps

After testing all features, you have a fully functional expense tracker! Consider customizing:
- Color schemes in `tailwind.config.ts`
- Categories in `lib/utils.ts`
- Add your own demo data for presentations
- Deploy to Vercel or Netlify

Enjoy tracking your expenses! 💰
