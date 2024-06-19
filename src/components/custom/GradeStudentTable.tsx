import React from 'react';

interface Student {
  no: number;
  nim: string;
  nama: string;
  poin: number;
  modul: number;
  program: string;
}

interface StudentTableProps {
  students: Student[];
}

const GradeStudentTable: React.FC<StudentTableProps> = ({ students }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <table className="min-w-full">
        <thead className="bg-blue-800 text-white" style={{ fontSize: '14px' }}>
          <tr>
            <th className="py-3 px-2 md:px-6 text-left border-b border-r">No</th>
            <th className="py-3 px-2 md:px-6 text-left border-b border-r">Nim</th>
            <th className="py-3 px-2 md:px-6 text-left border-b border-r">Nama</th>
            <th className="py-3 px-2 md:px-6 text-left border-b border-r">Jumlah Poin</th>
            <th className="py-3 px-2 md:px-6 text-left border-b border-r">Jumlah Modul Terselesaikan</th>
            <th className="py-3 px-2 md:px-6 text-left border-b">Modul Program Terakhir</th>
          </tr>
        </thead>
        <tbody style={{ fontSize: '14px' }}>
          {students.map((student, index) => (
            <tr key={student.no} className={`border-b ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
              <td className="py-3 px-2 md:px-6 border-r">{student.no}</td>
              <td className="py-3 px-2 md:px-6 border-r">{student.nim}</td>
              <td className="py-3 px-2 md:px-6 border-r">{student.nama}</td>
              <td className="py-3 px-2 md:px-6 border-r">{student.poin}</td>
              <td className="py-3 px-2 md:px-6 border-r">{student.modul}</td>
              <td className="py-3 px-2 md:px-6">{student.program}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GradeStudentTable;
