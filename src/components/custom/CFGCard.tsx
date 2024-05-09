import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  
  const CFGCard = ({}) => {
    return (
      <Card className="h-full w-full">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>CFG</CardTitle>
        </CardHeader>
        <CardContent>
        </CardContent>
        <CardFooter className="flex justify-between">
          {/* Konten footer card di sini */}
        </CardFooter>
      </Card>
    );
  };
  
  export default CFGCard;
  