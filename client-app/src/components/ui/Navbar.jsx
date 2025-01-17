import { Grid, Layout, Search } from "lucide-react";
import React from "react";
import { useTaskStore } from "../../state/useTaskStore";

const Navbar = () => {
  const {
    setSearchTerm,
    searchTerm,
    filters,
    setFilters,
    setViewMode,
    viewMode,
  } = useTaskStore();

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between h-16 gap-y-4">
          <div className="flex items-center gap-4 flex-grow sm:flex-grow-0">
            <h1 className="text-xl font-semibold whitespace-nowrap">ToDo List</h1>
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full sm:w-64 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 flex-wrap sm:flex-nowrap">
            <select
              value={filters.priority}
              onChange={(e) =>
                setFilters({ ...filters, priority: e.target.value })
              }
              className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Priorities</option>
              <option value="Low">Low Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="High">High Priority</option>
            </select>
            <select
              value={filters.date}
              onChange={(e) =>
                setFilters({ ...filters, date: e.target.value })
              }
              className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="tomorrow">Tomorrow</option>
              <option value="upcoming">Upcoming</option>
            </select>
            <div className="flex gap-2 border-l pl-4">
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md border ${
                  viewMode === "list"
                    ? "bg-gray-100 border-gray-300"
                    : "border-transparent"
                }`}
              >
                <Layout className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode("sticky")}
                className={`p-2 rounded-md border ${
                  viewMode === "sticky"
                    ? "bg-gray-100 border-gray-300"
                    : "border-transparent"
                }`}
              >
                <Grid className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
