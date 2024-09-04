'use client'

import React, { useState, useEffect } from 'react';
import { usePageTitle } from '../../components/PageTitleContext';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Button } from "../../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Search, Plus, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { generateEvaluators, Evaluator } from '../../utils/generateEvaluators';
import * as Popover from '@radix-ui/react-popover';

export default function Evaluators() {
  const [evaluatorData, setEvaluatorData] = useState<Evaluator[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [expertiseFilter, setExpertiseFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [experienceFilter, setExperienceFilter] = useState('all');
  const [filteredEvaluators, setFilteredEvaluators] = useState<Evaluator[]>([]);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const data = generateEvaluators();
    setEvaluatorData(data);
    setFilteredEvaluators(data);
  }, []);

  const handleSearch = () => {
    const filtered = evaluatorData.filter((evaluator) => {
      const matchesSearch = evaluator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            evaluator.expertise.some(exp => exp.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesExpertise = expertiseFilter === 'all' || evaluator.expertise.includes(expertiseFilter);
      const matchesStatus = statusFilter === 'all' || evaluator.status === statusFilter;
      const matchesExperience = experienceFilter === 'all' || 
        (experienceFilter === '0-2' && evaluator.yearsOfExperience <= 2) ||
        (experienceFilter === '3-5' && evaluator.yearsOfExperience > 2 && evaluator.yearsOfExperience <= 5) ||
        (experienceFilter === '6-10' && evaluator.yearsOfExperience > 5 && evaluator.yearsOfExperience <= 10) ||
        (experienceFilter === '10+' && evaluator.yearsOfExperience > 10);
      return matchesSearch && matchesExpertise && matchesStatus && matchesExperience;
    });
    setFilteredEvaluators(filtered);
    setCurrentPage(1);
  };

  const toggleRowExpansion = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const totalPages = Math.ceil(filteredEvaluators.length / itemsPerPage);
  const paginatedEvaluators = filteredEvaluators.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const { setPageTitle } = usePageTitle();
  
  useEffect(() => {
    setPageTitle('Evaluators');
  }, [setPageTitle]);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Evaluator
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search and Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <Input
              type="text"
              placeholder="Search evaluators or expertise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Select value={expertiseFilter} onValueChange={setExpertiseFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select expertise" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Expertise</SelectItem>
                  <SelectItem value="Frontend">Frontend</SelectItem>
                  <SelectItem value="Backend">Backend</SelectItem>
                  <SelectItem value="Full Stack">Full Stack</SelectItem>
                  <SelectItem value="DevOps">DevOps</SelectItem>
                  <SelectItem value="Machine Learning">Machine Learning</SelectItem>
                  <SelectItem value="Mobile Development">Mobile Development</SelectItem>
                  <SelectItem value="Data Science">Data Science</SelectItem>
                  <SelectItem value="Cloud Computing">Cloud Computing</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Interviewing">Interviewing</SelectItem>
                  <SelectItem value="Assigned">Assigned</SelectItem>
                </SelectContent>
              </Select>
              <Select value={experienceFilter} onValueChange={setExperienceFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Experience</SelectItem>
                  <SelectItem value="0-2">0-2 years</SelectItem>
                  <SelectItem value="3-5">3-5 years</SelectItem>
                  <SelectItem value="6-10">6-10 years</SelectItem>
                  <SelectItem value="10+">10+ years</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleSearch}>
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Evaluator List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden sm:table-cell">Expertise</TableHead>
                  <TableHead className="hidden md:table-cell">Experience</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden lg:table-cell">Current Interview</TableHead>
                  <TableHead className="hidden lg:table-cell">Queued Evaluations</TableHead>
                  <TableHead className="hidden md:table-cell">Avg. Rating</TableHead>
                  <TableHead className="lg:hidden">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedEvaluators.map((evaluator) => (
                  <React.Fragment key={evaluator.id}>
                    <TableRow>
                      <TableCell className="font-medium">{evaluator.name}</TableCell>
                      <TableCell className="hidden sm:table-cell">{evaluator.expertise.join(', ')}</TableCell>
                      <TableCell className="hidden md:table-cell">{evaluator.yearsOfExperience} years</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          evaluator.status === 'Available' ? 'bg-green-100 text-green-800' :
                          evaluator.status === 'Interviewing' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {evaluator.status}
                        </span>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {evaluator.currentInterview ? evaluator.currentInterview.candidateName : 'N/A'}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <Popover.Root>
                          <Popover.Trigger asChild>
                            <Button variant="ghost" size="sm" className="flex items-center">
                              {evaluator.queuedEvaluations.length}
                              <Info className="w-4 h-4 ml-1 text-gray-400" />
                            </Button>
                          </Popover.Trigger>
                          <Popover.Portal>
                            <Popover.Content className="bg-white p-4 rounded shadow-lg z-50 max-w-sm">
                              <h4 className="font-bold mb-2">Queued Evaluations</h4>
                              {evaluator.queuedEvaluations.length > 0 ? (
                                <ul className="list-disc pl-5">
                                  {evaluator.queuedEvaluations.map((evaluation, index) => (
                                    <li key={index}>
                                      {evaluation.candidateName} (ID: {evaluation.candidateId}) - {evaluation.date} at {evaluation.time}
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <p>No queued evaluations</p>
                              )}
                              <Popover.Arrow className="fill-white" />
                            </Popover.Content>
                          </Popover.Portal>
                        </Popover.Root>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{evaluator.averageRating.toFixed(1)}</TableCell>
                      <TableCell className="lg:hidden">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleRowExpansion(evaluator.id)}
                        >
                          {expandedRow === evaluator.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow className="lg:hidden">
                      <TableCell colSpan={8} className="p-0">
                        <div
                          className={`overflow-hidden transition-all duration-200 ${
                            expandedRow === evaluator.id ? 'max-h-[500px]' : 'max-h-0'
                          }`}
                        >
                          <div className="p-4 bg-gray-50 space-y-2">
                            <p><strong>Expertise:</strong> {evaluator.expertise.join(', ')}</p>
                            <p><strong>Experience:</strong> {evaluator.yearsOfExperience} years</p>
                            <p><strong>Evaluations Completed:</strong> {evaluator.evaluationsCompleted}</p>
                            <p><strong>Average Rating:</strong> {evaluator.averageRating.toFixed(1)}</p>
                            <p><strong>Current Interview:</strong> {evaluator.currentInterview ? evaluator.currentInterview.candidateName : 'N/A'}</p>
                            <div>
                              <strong>Queued Evaluations:</strong>
                              {evaluator.queuedEvaluations.length > 0 ? (
                                <ul className="list-disc pl-5 mt-2">
                                  {evaluator.queuedEvaluations.map((evaluation, index) => (
                                    <li key={index}>
                                      {evaluation.candidateName} (ID: {evaluation.candidateId}) - {evaluation.date} at {evaluation.time}
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <p className="mt-2">No queued evaluations</p>
                              )}
                            </div>
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
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredEvaluators.length)} of {filteredEvaluators.length} entries
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}