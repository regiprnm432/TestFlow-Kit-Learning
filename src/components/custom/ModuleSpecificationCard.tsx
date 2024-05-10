import React from 'react';
import '../../index.css'; // Import file CSS terpisah

const ModuleSpecificationCard = () => {
  return (
    <div className='p-4 bg-white rounded-lg shadow-md h-screen'>
      <div className="max-h-[80vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-2 module-title">Nama Modul</h3>
        <h3 className="text-lg font-semibold mb-2 module-description">Deskripsi Modul</h3>
        <p className="mb-4 module-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pretium,
          felis eget faucibus molestie, arcu ligula luctus felis, in viverra eros
          ex id enim. Integer bibendum tellus eget risus pharetra eleifend.
        </p>
        <h3 className="text-lg font-semibold mb-2 module-parameter">Parameter</h3>
        <ul className="list-disc list-inside mb-4 module-parameter">
          <li>
            <span className="font-semibold">Parameter 1:</span> Tipe Data 1 -
            Aturan 1
          </li>
          <li>
            <span className="font-semibold">Parameter 2:</span> Tipe Data 2 -
            Aturan 2
          </li>
          <li>
            <span className="font-semibold">Parameter 3:</span> Tipe Data 3 -
            Aturan 3
          </li>
        </ul>
        <h3 className="text-lg font-semibold mb-2 module-title">Source Code (Java)</h3>
        <div className="bg-gray-100 p-4 rounded-lg source-code">
          <pre className="whitespace-pre-wrap">{`public class HelloWorld {
  public static void main(String[] args) {
    System.out.println("Hello, World!")lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll
    lllllll
    lllllll
    lllll
    llllll
    lllllll;
  }
}`}</pre>
        </div>
      </div>
    </div>
  );
};

export default ModuleSpecificationCard;
