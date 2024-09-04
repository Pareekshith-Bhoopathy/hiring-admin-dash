'use client'

import React, { useState, useEffect } from 'react';
import { usePageTitle } from '../../components/PageTitleContext';

import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Button } from "../../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { CalendarIcon, FilterIcon, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { generateTransactions, Transaction } from '../../utils/generateTransactions';

const transactionData = generateTransactions();

export default function Transactions() {
  const { setPageTitle } = usePageTitle();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [transactionType, setTransactionType] = useState('all');
  const [status, setStatus] = useState('all');
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(transactionData);

  const itemsPerPage = 25;
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const handleFilter = () => {
    const filtered = transactionData.filter((transaction) => {
      const dateInRange = (!startDate || transaction.date >= startDate) && (!endDate || transaction.date <= endDate);
      const typeMatch = transactionType === 'all' || transaction.type === transactionType;
      const statusMatch = status === 'all' || transaction.status === status;
      return dateInRange && typeMatch && statusMatch;
    });
    setFilteredTransactions(filtered);
    setCurrentPage(1);
    setExpandedRows(new Set());
  };

  const toggleRowExpansion = (id: number) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };
  useEffect(() => {
    setPageTitle('Transactions');
  }, [setPageTitle]);


  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <div className="relative">
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="pl-10"
                />
                <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <div className="relative">
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="pl-10"
                />
                <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Type</label>
              <Select value={transactionType} onValueChange={setTransactionType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Job Posting">Job Posting</SelectItem>
                  <SelectItem value="Premium Subscription">Premium Subscription</SelectItem>
                  <SelectItem value="Featured Listing">Featured Listing</SelectItem>
                  <SelectItem value="Application Fee">Application Fee</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={handleFilter} className="mt-4">
            <FilterIcon className="w-4 h-4 mr-2" />
            Apply Filters
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transaction List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Entity</TableHead>
                  <TableHead className="hidden md:table-cell">Amount</TableHead>
                  <TableHead className="hidden md:table-cell">Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="md:hidden">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedTransactions.map((transaction) => (
                  <React.Fragment key={transaction.id}>
                    <TableRow>
                      <TableCell className="font-medium">{transaction.id}</TableCell>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.entity}</TableCell>
                      <TableCell className="hidden md:table-cell">₹{transaction.amount.toLocaleString()}</TableCell>
                      <TableCell className="hidden md:table-cell">{transaction.type}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(transaction.status)}`}>
                          {transaction.status}
                        </span>
                      </TableCell>
                      <TableCell className="md:hidden">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleRowExpansion(transaction.id)}
                        >
                          {expandedRows.has(transaction.id) ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow className="md:hidden">
                      <TableCell colSpan={7} className="p-0">
                        <div
                          className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            expandedRows.has(transaction.id) ? 'max-h-20' : 'max-h-0'
                          }`}
                        >
                          <div className="p-4 bg-gray-50">
                            <p><strong>Amount:</strong> ₹{transaction.amount.toLocaleString()}</p>
                            <p><strong>Type:</strong> {transaction.type}</p>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div>
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length} entries
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={20} />
              </Button>
              <Button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight size={20} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}