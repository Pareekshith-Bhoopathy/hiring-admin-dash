'use client'

import React, { useState, useEffect } from 'react';
import { usePageTitle } from '../../components/PageTitleContext';

import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Button } from "../../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Building, Search, Plus, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { generateCompanies, Company } from '../../utils/generateCompanies';

export default function Companies() {
  const [companyData, setCompanyData] = useState<Company[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { setPageTitle } = usePageTitle();


  useEffect(() => {
    const data = generateCompanies();
    setCompanyData(data);
    setFilteredCompanies(data);
    setPageTitle('Companies');
  }, [setPageTitle]);

  const handleSearch = () => {
    const filtered = companyData.filter((company) => {
      const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            company.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesIndustry = industryFilter === 'all' || company.industry === industryFilter;
      return matchesSearch && matchesIndustry;
    });
    setFilteredCompanies(filtered);
    setCurrentPage(1);
  };

  const toggleRowExpansion = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);
  const paginatedCompanies = filteredCompanies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Company
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search and Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-64">
              <Select value={industryFilter} onValueChange={setIndustryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  <SelectItem value="IT Services">IT Services</SelectItem>
                  <SelectItem value="IT Consulting">IT Consulting</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Software Development">Software Development</SelectItem>
                  <SelectItem value="Cloud Services">Cloud Services</SelectItem>
                  <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleSearch}>
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Company List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Industry</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="hidden md:table-cell">Employees</TableHead>
                  <TableHead className="hidden md:table-cell">Active Jobs</TableHead>
                  <TableHead className="md:hidden">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCompanies.map((company) => (
                  <React.Fragment key={company.id}>
                    <TableRow>
                      <TableCell className="font-medium">{company.name}</TableCell>
                      <TableCell className="hidden md:table-cell">{company.industry}</TableCell>
                      <TableCell>{company.location}</TableCell>
                      <TableCell className="hidden md:table-cell">{company.employees.toLocaleString()}</TableCell>
                      <TableCell className="hidden md:table-cell">{company.activeJobs}</TableCell>
                      <TableCell className="md:hidden">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleRowExpansion(company.id)}
                        >
                          {expandedRow === company.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow className="md:hidden">
                      <TableCell colSpan={6} className="p-0">
                        <div
                          className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            expandedRow === company.id ? 'max-h-40' : 'max-h-0'
                          }`}
                        >
                          <div className="p-4 bg-gray-50">
                            <p><strong>Industry:</strong> {company.industry}</p>
                            <p><strong>Employees:</strong> {company.employees.toLocaleString()}</p>
                            <p><strong>Active Jobs:</strong> {company.activeJobs}</p>
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
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredCompanies.length)} of {filteredCompanies.length} entries
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}