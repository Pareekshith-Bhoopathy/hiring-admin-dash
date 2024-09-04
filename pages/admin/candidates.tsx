'use client'

import React, { useState, useEffect } from 'react';
import { usePageTitle } from '../../components/PageTitleContext';

import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Button } from "../../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Search, Plus, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { generateCandidates, Candidate } from '../../utils/generateCandidates';

export default function Candidates() {
  const [candidateData, setCandidateData] = useState<Candidate[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { setPageTitle } = usePageTitle();
  
  useEffect(() => {
    setPageTitle('Candidates');
  }, [setPageTitle]);

  useEffect(() => {
    const data = generateCandidates();
    setCandidateData(data);
    setFilteredCandidates(data);
  }, []);

  const handleSearch = () => {
    const filtered = candidateData.filter((candidate) => {
      const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesLocation = locationFilter === 'all' || candidate.location === locationFilter;
      const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter;
      return matchesSearch && matchesLocation && matchesStatus;
    });
    setFilteredCandidates(filtered);
    setCurrentPage(1);
  };

  const toggleRowExpansion = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const totalPages = Math.ceil(filteredCandidates.length / itemsPerPage);
  const paginatedCandidates = filteredCandidates.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Candidate
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
                placeholder="Search candidates or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-64">
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="Mumbai">Mumbai</SelectItem>
                  <SelectItem value="Bangalore">Bangalore</SelectItem>
                  <SelectItem value="Delhi">Delhi</SelectItem>
                  <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                  <SelectItem value="Chennai">Chennai</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-64">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Interviewing">Interviewing</SelectItem>
                  <SelectItem value="Hired">Hired</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
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
          <CardTitle>Candidate List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Skills</TableHead>
                  <TableHead className="hidden md:table-cell">Experience</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Applied Jobs</TableHead>
                  <TableHead className="md:hidden">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCandidates.map((candidate) => (
                  <React.Fragment key={candidate.id}>
                    <TableRow>
                      <TableCell className="font-medium">{candidate.name}</TableCell>
                      <TableCell className="hidden md:table-cell">{candidate.skills.join(', ')}</TableCell>
                      <TableCell className="hidden md:table-cell">{candidate.experience} years</TableCell>
                      <TableCell>{candidate.location}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          candidate.status === 'Active' ? 'bg-green-100 text-green-800' :
                          candidate.status === 'Interviewing' ? 'bg-blue-100 text-blue-800' :
                          candidate.status === 'Hired' ? 'bg-purple-100 text-purple-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {candidate.status}
                        </span>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{candidate.appliedJobs}</TableCell>
                      <TableCell className="md:hidden">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleRowExpansion(candidate.id)}
                        >
                          {expandedRow === candidate.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow className="md:hidden">
                      <TableCell colSpan={6} className="p-0">
                        <div
                          className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            expandedRow === candidate.id ? 'max-h-40' : 'max-h-0'
                          }`}
                        >
                          <div className="p-4 bg-gray-50">
                            <p><strong>Skills:</strong> {candidate.skills.join(', ')}</p>
                            <p><strong>Experience:</strong> {candidate.experience} years</p>
                            <p><strong>Applied Jobs:</strong> {candidate.appliedJobs}</p>
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
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredCandidates.length)} of {filteredCandidates.length} entries
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