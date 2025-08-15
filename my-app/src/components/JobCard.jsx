import React from "react";
import { useSelector } from "react-redux";
import { Edit, Trash2, MapPin, Phone, Mail, User, Calendar, FileText, Download } from "lucide-react";
import { getStatusColor } from "../constants/index";
import jsPDF from "jspdf";

const JobCard = ({ job, onEdit, onDelete }) => {
  const user = useSelector((state) => state.auth.user);
  const theme = useSelector((state) => state.theme.mode);
  const userEmail = user?.email;
  const role = user?.role;

  const canEdit = role === "ADMIN" || (role === "USER" && job.email === userEmail);
  const canDelete = role === "ADMIN" || (role === "USER" && job.email === userEmail);

  function getStatusPDFColorRGB(status) {
    switch (status?.toLowerCase()) {
      case "applied":
        return { bg: { r: 52, g: 152, b: 219 }, text: { r: 255, g: 255, b: 255 } };
      case "interviewing":
        return { bg: { r: 243, g: 156, b: 18 }, text: { r: 255, g: 255, b: 255 } };
      case "offered":
        return { bg: { r: 39, g: 174, b: 96 }, text: { r: 255, g: 255, b: 255 } };
      case "rejected":
        return { bg: { r: 231, g: 76, b: 60 }, text: { r: 255, g: 255, b: 255 } };
      default:
        return { bg: { r: 149, g: 165, b: 166 }, text: { r: 255, g: 255, b: 255 } };
    }
  }

  const generatePDF = () => {
    const doc = new jsPDF();
    const statusColors = getStatusPDFColorRGB(job.status);
    const pageWidth = doc.internal.pageSize.width;
    let currentY = 20;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(44, 62, 80);
    doc.text(job.company, pageWidth / 2, currentY, { align: "center" });
    currentY += 15;

    doc.setFontSize(20);
    doc.setTextColor(statusColors.bg.r, statusColors.bg.g, statusColors.bg.b);
    doc.text(job.title, pageWidth / 2, currentY, { align: "center" });
    currentY += 20;

    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.line(20, currentY, pageWidth - 20, currentY);
    currentY += 15;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(44, 62, 80);
    doc.text("JOB OVERVIEW", 20, currentY);
    currentY += 10;

    const statusBadgeWidth = 60;
    const statusBadgeHeight = 8;
    doc.setFillColor(statusColors.bg.r, statusColors.bg.g, statusColors.bg.b);
    doc.roundedRect(20, currentY - 2, statusBadgeWidth, statusBadgeHeight, 2, 2, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text("STATUS: " + job.status.toUpperCase(), 22, currentY + 3);
    currentY += 20;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(44, 62, 80);
    doc.text("CONTACT INFORMATION", 20, currentY);
    currentY += 5;

    doc.setDrawColor(statusColors.bg.r, statusColors.bg.g, statusColors.bg.b);
    doc.setLineWidth(2);
    doc.line(20, currentY, 120, currentY);
    currentY += 12;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);

    const leftCol = 20;
    const rightCol = pageWidth / 2 + 10;
    let leftY = currentY;
    let rightY = currentY;

    if (job.employee) {
      doc.setFont("helvetica", "bold");
      doc.text("Contact Person:", leftCol, leftY);
      doc.setFont("helvetica", "normal");
      doc.text(job.employee, leftCol + 35, leftY);
      leftY += 8;
    }

    if (job.email) {
      doc.setFont("helvetica", "bold");
      doc.text("Email:", leftCol, leftY);
      doc.setFont("helvetica", "normal");
      doc.text(job.email, leftCol + 15, leftY);
      leftY += 8;
    }

    if (job.phone) {
      doc.setFont("helvetica", "bold");
      doc.text("Phone:", rightCol, rightY);
      doc.setFont("helvetica", "normal");
      doc.text(job.phone, rightCol + 15, rightY);
      rightY += 8;
    }

    if (job.location) {
      doc.setFont("helvetica", "bold");
      doc.text("Location:", rightCol, rightY);
      doc.setFont("helvetica", "normal");
      doc.text(job.location, rightCol + 22, rightY);
      rightY += 8;
    }

    currentY = Math.max(leftY, rightY) + 15;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(44, 62, 80);
    doc.text("APPLICATION DETAILS", 20, currentY);
    currentY += 8;

    doc.setDrawColor(statusColors.bg.r, statusColors.bg.g, statusColors.bg.b);
    doc.setLineWidth(2);
    doc.line(20, currentY, 120, currentY);
    currentY += 12;

    if (job.appliedDate) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(60, 60, 60);
      doc.text("Application Date:", 20, currentY);
      doc.setFont("helvetica", "normal");
      doc.text(job.appliedDate, 60, currentY);
      currentY += 15;
    }

    if (job.notes) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(44, 62, 80);
      doc.text("NOTES & COMMENTS", 20, currentY);
      currentY += 5;

      doc.setDrawColor(statusColors.bg.r, statusColors.bg.g, statusColors.bg.b);
      doc.setLineWidth(2);
      doc.line(20, currentY, 120, currentY);
      currentY += 12;

      doc.setFillColor(248, 249, 250);
      doc.setDrawColor(220, 220, 220);
      const notesBoxHeight = 40;
      doc.roundedRect(20, currentY - 5, pageWidth - 40, notesBoxHeight, 3, 3, "FD");

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      const notesLines = doc.splitTextToSize(job.notes, pageWidth - 50);
      doc.text(notesLines, 25, currentY + 5);
      currentY += notesBoxHeight + 10;
    }

    const footerY = 280;
    
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.line(20, footerY, pageWidth - 20, footerY);

    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.setTextColor(120, 120, 120);
    doc.text(
      `Job Application Report - Generated on ${new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })}`,
      pageWidth / 2,
      footerY + 8,
      { align: "center" }
    );

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text(
      "This document contains confidential job application information",
      pageWidth / 2,
      footerY + 15,
      { align: "center" }
    );

    const fileName = `JobApplication_${job.title.replace(/[^a-z0-9]/gi, "_")}_${job.company
      .replace(/[^a-z0-9]/gi, "_")}_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
  };

  return (
    <div
      className={`
      rounded-xl border backdrop-blur-sm p-6 transition-all duration-300 flex flex-col h-full group relative overflow-hidden hover:scale-[1.02] transform
      ${theme === "dark"
        ? "bg-gradient-to-br from-slate-800/90 to-gray-800/90 border-gray-700/50 shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30"
        : "bg-gradient-to-br from-white/90 to-gray-50/90 border-gray-200/50 shadow-lg shadow-gray-500/10 hover:shadow-xl hover:shadow-gray-500/20"
      }
    `}
    >
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="flex-1 min-w-0">
          <h3
            className={`
            text-lg font-semibold mb-1 truncate transition-colors duration-300
            ${theme === "dark" ? "text-white group-hover:text-blue-400" : "text-gray-900 group-hover:text-indigo-600"}
          `}
          >
            {job.title}
          </h3>
          <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"} truncate`}>{job.company}</p>
        </div>
        <div className="ml-3 flex-shrink-0">
          <span
            className={`
            inline-flex px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300
            ${getStatusColor(job.status, theme)}
          `}
          >
            {job.status}
          </span>
        </div>
      </div>

      <div className="space-y-2.5 text-sm mb-4 relative z-10 flex-1">
        {job.employee && (
          <div className="flex items-center">
            <User className="w-4 h-4 mr-3" /> {job.employee}
          </div>
        )}
        {job.phone && (
          <div className="flex items-center">
            <Phone className="w-4 h-4 mr-3" /> {job.phone}
          </div>
        )}
        {job.email && (
          <div className="flex items-center">
            <Mail className="w-4 h-4 mr-3" /> {job.email}
          </div>
        )}
        {job.location && (
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-3" /> {job.location}
          </div>
        )}
        {job.appliedDate && (
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-3" /> Applied: {job.appliedDate}
          </div>
        )}
        {job.notes && (
          <div className="flex items-start">
            <FileText className="w-4 h-4 mr-3" /> {job.notes}
          </div>
        )}
      </div>

      <div className="mt-auto flex justify-end space-x-2">
        <button onClick={generatePDF} className="bg-green-600 text-white px-3 py-2 rounded-lg flex items-center hover:bg-green-700 transition-colors">
          <Download className="w-4 h-4 mr-1" /> PDF
        </button>
        {canEdit && (
          <button onClick={() => onEdit(job)} className="bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors">
            <Edit className="w-4 h-4 mr-1" /> Edit
          </button>
        )}
        {canDelete && (
          <button onClick={() => onDelete(job.id)} className="bg-red-600 text-white px-3 py-2 rounded-lg flex items-center hover:bg-red-700 transition-colors">
            <Trash2 className="w-4 h-4 mr-1" /> Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default JobCard;