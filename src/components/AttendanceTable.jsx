import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Button } from './ui/button';
import { CheckCircle, XCircle } from 'lucide-react';

const AttendanceTable = ({ athletes, onAttendanceChange }) => {
  const [attendance, setAttendance] = useState({});

  const handleAttendance = (athleteId, status) => {
    const newAttendance = {
      ...attendance,
      [athleteId]: status
    };
    setAttendance(newAttendance);
    
    // Save to localStorage (demo)
    localStorage.setItem('bgr_attendance', JSON.stringify(newAttendance));
    
    if (onAttendanceChange) {
      onAttendanceChange(athleteId, status);
    }
  };

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Grade</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {athletes.map((athlete) => {
            const currentStatus = attendance[athlete.id];
            return (
              <TableRow key={athlete.id}>
                <TableCell className="font-medium">{athlete.name}</TableCell>
                <TableCell>{athlete.age}</TableCell>
                <TableCell>{athlete.grade}</TableCell>
                <TableCell className="text-center">
                  {currentStatus === 'present' && (
                    <span className="text-green-600 font-semibold">Present</span>
                  )}
                  {currentStatus === 'absent' && (
                    <span className="text-red-600 font-semibold">Absent</span>
                  )}
                  {!currentStatus && <span className="text-gray-400">-</span>}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      size="sm"
                      variant={currentStatus === 'present' ? 'default' : 'outline'}
                      className={currentStatus === 'present' ? 'bg-green-500 hover:bg-green-600' : ''}
                      onClick={() => handleAttendance(athlete.id, 'present')}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Present
                    </Button>
                    <Button
                      size="sm"
                      variant={currentStatus === 'absent' ? 'default' : 'outline'}
                      className={currentStatus === 'absent' ? 'bg-red-500 hover:bg-red-600' : ''}
                      onClick={() => handleAttendance(athlete.id, 'absent')}
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Absent
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default AttendanceTable;

