import AddModuleForm from "@/components/custom/AddModuleForm";
import Layout from "./Layout";

const ModuleTestPage = () => {
    const handleAddModule = (module: any) => {
        console.log("New module added:", module);
        // Tambahkan logika untuk menangani penambahan modul di sini
    };

    return (
        <Layout>
            <div className="min-h-screen w-screen flex items-center justify-center bg-gray-100">
                <AddModuleForm onAddModule={handleAddModule} />
            </div>
        </Layout>
    );
};

export default ModuleTestPage;

