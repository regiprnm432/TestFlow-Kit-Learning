import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface Student {
  id: string;
  nim: string;
  name: string;
  class: string;
  program: string;
}

interface StudentTableProps {
  students: Student[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const StudentTable: React.FC<StudentTableProps> = ({ students, onEdit, onDelete }) => {
  return (
    <table className="min-w-full">
      <thead className="bg-blue-800 text-white" style={{ fontSize: '14px' }}>
        <tr>
        <th className="py-3 px-6 text-left border-b border-r">No</th>
        <th className="py-3 px-6 text-left border-b border-r">Nim</th>
        <th className="py-3 px-6 text-left border-b border-r">Nama</th>
        <th className="py-3 px-6 text-left border-b border-r">Kelas</th>
        <th className="py-3 px-6 text-left border-b border-r">Prodi</th>
        <th className="py-3 px-6 text-left border-b border-r">Action</th>
        </tr>
      </thead>
      <tbody style={{ fontSize: '14px' }}>
        {students.map((student, index) => (
          <tr key={student.id} className={`border-b ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
             <td className="py-3 px-6 border-r">{index + 1}</td>
             <td className="py-3 px-6 border-r">{student.nim}</td>
             <td className="py-3 px-6 border-r">{student.name}</td>
             <td className="py-3 px-6 border-r">{student.class}</td>
             <td className="py-3 px-6 border-r">{student.program}</td>
             <td className="py-3 px-6 border-r">
              <button onClick={() => onEdit(student.id)} className="text-blue-500 mr-2">
                <FaEdit />
              </button>
              <button onClick={() => onDelete(student.id)} className="text-red-500">
                <FaTrash />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentTable;
