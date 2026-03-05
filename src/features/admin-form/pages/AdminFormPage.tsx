import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload, FileText, X } from "lucide-react";
import { MainLayout } from "../../../shared/components/layout/MainLayout";
import { Button, Input, Card } from "../../../shared/components";

const formSchema = z.object({
  categoryName: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  company: z.string().min(1, "Selecciona una empresa"),
  companyType: z.string().min(1, "Selecciona un tipo de empresa"),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres"),
});

type FormData = z.infer<typeof formSchema>;

const companies = [
  { id: 1, name: "LVL Consulting" },
  { id: 2, name: "Tech Solutions" },
  { id: 3, name: "Digital Agency" },
];

const companyTypes = [
  { id: 1, name: "Tecnología" },
  { id: 2, name: "Consultoría" },
  { id: 3, name: "Marketing" },
];

export default function AdminFormPage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Form data:", data);
    console.log("Uploaded file:", uploadedFile);
    alert("Formulario guardado exitosamente!");
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const pdfFile = files.find((file) => file.type === "application/pdf");

    if (pdfFile) {
      setUploadedFile(pdfFile);
    } else {
      alert("Por favor, sube solo archivos PDF");
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      if (files[0].type === "application/pdf") {
        setUploadedFile(files[0]);
      } else {
        alert("Por favor, sube solo archivos PDF");
      }
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
  };

  return (
    <MainLayout>
      {/* Header con título y botón */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-xl font-semibold text-[#1e293b]">Nuevo formulario</h1>
          <p className="text-sm text-slate-500 mt-1">Complete sus datos y continúe con los siguientes pasos.</p>
        </div>
        <Button type="submit" form="admin-form">Guardar</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-6">
        {/* Columna Izquierda - Formulario (3/5 del ancho) */}
        <div className="lg:col-span-3">
          <Card>
            <form id="admin-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="p-6">
                <div className="space-y-6">
                  {/* Fila con dos inputs de categoría */}
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      {...register("categoryName")}
                      label="Nombre de categoría*"
                      placeholder="Introducir la categoría"
                      error={errors.categoryName?.message}
                    />
                    <Input
                      label="Nombre de categoría*"
                      placeholder="Introducir la categoría"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1e293b] mb-1.5">
                      Empresa*
                    </label>
                    <select
                      {...register("company")}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#002084] focus:border-transparent"
                    >
                      <option value="">Seleccionar una empresa</option>
                      {companies.map((company) => (
                        <option key={company.id} value={company.name}>
                          {company.name}
                        </option>
                      ))}
                    </select>
                    {errors.company && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.company.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1e293b] mb-1.5">
                      Tipo de empresas
                    </label>
                    <select
                      {...register("companyType")}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#002084] focus:border-transparent"
                    >
                      <option value="">Seleccionar tipo de empresas</option>
                      {companyTypes.map((type) => (
                        <option key={type.id} value={type.name}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                    {errors.companyType && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.companyType.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1e293b] mb-1.5">
                      Tipo de empresas
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#002084] focus:border-transparent"
                    >
                      <option value="">Seleccionar tipo de empresas</option>
                      {companyTypes.map((type) => (
                        <option key={type.id} value={type.name}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1e293b] mb-1.5">
                      Descripción
                    </label>
                    <textarea
                      {...register("description")}
                      rows={8}
                      placeholder="Escribe una descripción para la categoría"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#002084] focus:border-transparent resize-none"
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.description.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </Card>
        </div>

        {/* Columna Derecha - Documentos (2/5 del ancho) */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <div className="p-6 h-full flex flex-col">
              <h3 className="text-sm font-medium text-[#1e293b] mb-4">
                Documentos
              </h3>

              {!uploadedFile ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`
                    border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer flex-1 flex flex-col items-center justify-center
                    ${
                      isDragging
                        ? "border-[#002084] bg-blue-50"
                        : "border-slate-300 hover:border-slate-400"
                    }
                  `}
                >
                  <label className="cursor-pointer block">
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileInput}
                      className="hidden"
                    />
                    <Upload
                      size={40}
                      className={`mx-auto mb-4 ${isDragging ? "text-[#002084]" : "text-slate-400"}`}
                    />
                    <Button type="button" className="mb-3">
                      Seleccionar archivos
                    </Button>
                    <p className="text-xs text-slate-500">
                      o arrastre y suelte los PDF aquí
                    </p>
                  </label>
                </div>
              ) : (
                <div className="border-2 border-slate-200 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center shrink-0">
                      <FileText size={24} className="text-red-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[#1e293b] truncate">
                        {uploadedFile.name}
                      </p>
                      <p className="text-sm text-slate-500">
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="p-2 hover:bg-slate-100 rounded-lg transition-colors shrink-0"
                      aria-label="Eliminar archivo"
                    >
                      <X size={20} className="text-slate-600" />
                    </button>
                  </div>

                  <div className="mt-6">
                    <div className="aspect-3/4 bg-slate-100 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <FileText
                          size={64}
                          className="mx-auto text-slate-400 mb-2"
                        />
                        <p className="text-sm text-slate-500">
                          Vista previa del PDF
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
