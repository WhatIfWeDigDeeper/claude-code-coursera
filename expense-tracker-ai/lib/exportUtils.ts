import { Expense } from '@/types';
import { format } from 'date-fns';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Export expenses to CSV format
 */
export const exportToCSV = (expenses: Expense[], filename: string): void => {
  const headers = ['Date', 'Category', 'Amount', 'Description'];
  const rows = expenses.map((expense) => [
    format(expense.date, 'yyyy-MM-dd'),
    expense.category,
    expense.amount.toString(),
    `"${expense.description.replace(/"/g, '""')}"`,
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.join(',')),
  ].join('\n');

  downloadFile(csvContent, `${filename}.csv`, 'text/csv;charset=utf-8;');
};

/**
 * Export expenses to JSON format
 */
export const exportToJSON = (expenses: Expense[], filename: string): void => {
  const exportData = {
    exportDate: new Date().toISOString(),
    totalRecords: expenses.length,
    totalAmount: expenses.reduce((sum, exp) => sum + exp.amount, 0),
    expenses: expenses.map((expense) => ({
      id: expense.id,
      date: format(expense.date, 'yyyy-MM-dd'),
      category: expense.category,
      amount: expense.amount,
      description: expense.description,
    })),
  };

  const jsonContent = JSON.stringify(exportData, null, 2);
  downloadFile(jsonContent, `${filename}.json`, 'application/json;charset=utf-8;');
};

/**
 * Export expenses to PDF format with professional formatting
 */
export const exportToPDF = (expenses: Expense[], filename: string): void => {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(20);
  doc.setTextColor(37, 99, 235); // primary-600 color
  doc.text('Expense Report', 14, 22);

  // Report metadata
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Generated: ${format(new Date(), 'MMMM dd, yyyy HH:mm')}`, 14, 30);
  doc.text(`Total Records: ${expenses.length}`, 14, 36);

  // Calculate totals
  const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  doc.text(`Total Amount: $${totalAmount.toFixed(2)}`, 14, 42);

  // Category breakdown
  const categoryTotals: Record<string, number> = {};
  expenses.forEach((exp) => {
    categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
  });

  // Add a line separator
  doc.setDrawColor(220, 220, 220);
  doc.line(14, 48, 196, 48);

  // Table data
  const tableData = expenses.map((expense) => [
    format(expense.date, 'MMM dd, yyyy'),
    expense.category,
    `$${expense.amount.toFixed(2)}`,
    expense.description.length > 40
      ? expense.description.substring(0, 37) + '...'
      : expense.description,
  ]);

  // Generate table
  autoTable(doc, {
    head: [['Date', 'Category', 'Amount', 'Description']],
    body: tableData,
    startY: 52,
    theme: 'striped',
    headStyles: {
      fillColor: [37, 99, 235], // primary-600
      textColor: [255, 255, 255],
      fontSize: 10,
      fontStyle: 'bold',
    },
    styles: {
      fontSize: 9,
      cellPadding: 3,
    },
    columnStyles: {
      0: { cellWidth: 28 },
      1: { cellWidth: 35 },
      2: { cellWidth: 25, halign: 'right' },
      3: { cellWidth: 'auto' },
    },
    alternateRowStyles: {
      fillColor: [245, 247, 250],
    },
    margin: { top: 52 },
  });

  // Add category summary on new page if there are categories
  if (Object.keys(categoryTotals).length > 0) {
    doc.addPage();
    doc.setFontSize(16);
    doc.setTextColor(37, 99, 235);
    doc.text('Category Breakdown', 14, 22);

    const categoryData = Object.entries(categoryTotals)
      .sort(([, a], [, b]) => b - a)
      .map(([category, amount]) => {
        const percentage = totalAmount > 0 ? ((amount / totalAmount) * 100).toFixed(1) : '0.0';
        return [category, `$${amount.toFixed(2)}`, `${percentage}%`];
      });

    autoTable(doc, {
      head: [['Category', 'Amount', 'Percentage']],
      body: categoryData,
      startY: 30,
      theme: 'striped',
      headStyles: {
        fillColor: [37, 99, 235],
        textColor: [255, 255, 255],
        fontSize: 10,
        fontStyle: 'bold',
      },
      styles: {
        fontSize: 10,
        cellPadding: 4,
      },
      columnStyles: {
        0: { cellWidth: 60 },
        1: { cellWidth: 50, halign: 'right' },
        2: { cellWidth: 40, halign: 'right' },
      },
      alternateRowStyles: {
        fillColor: [245, 247, 250],
      },
    });
  }

  // Add footer with page numbers
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `Page ${i} of ${pageCount}`,
      doc.internal.pageSize.getWidth() / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
  }

  // Save the PDF
  doc.save(`${filename}.pdf`);
};

/**
 * Helper function to trigger file download
 */
const downloadFile = (content: string, filename: string, mimeType: string): void => {
  const blob = new Blob([content], { type: mimeType });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Clean up the URL object
  URL.revokeObjectURL(url);
};
