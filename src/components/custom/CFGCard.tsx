import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import "../../index.css";

// Import gambar CFG
import cfgImage from "../../assets/cfg.jpg";

const CFGCard = ({}) => {
  return (
    <div className="card-container w-full">
      <Card className="card">
        <CardHeader className="card-header ">
          <CardTitle className="module-title">CFG</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center module-title">
          {/* Menampilkan gambar dalam konten */}
          <img
            src={cfgImage}
            alt="CFG"
            className="center"
            style={{ maxWidth: "50%" }}
          />
        </CardContent>
        <CardFooter className="card-footer">
          {/* Konten footer card di sini */}
        </CardFooter>
      </Card>
    </div>
  );
};

export default CFGCard;
