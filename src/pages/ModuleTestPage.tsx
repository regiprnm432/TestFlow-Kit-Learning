import AddModuleForm from "@/components/custom/AddModuleForm";
import Layout from "./Layout";

const ModuleTestPage = () => {
    const handleAddModule = (module: any) => {
        console.log("New module added:", module);
    };

    return (
        <Layout>
            <div className="min-h-screen w-screen flex items-center justify-center bg-gray-100 p-10">
                <AddModuleForm onAddModule={handleAddModule} />
            </div>
        </Layout>
    );
};

export default ModuleTestPage;
