import { useState } from 'react';
import { Modal } from './ui/Modal';
import { Button} from './ui';

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormField {
  id: string;
  label: string;
  show: boolean;
  required: boolean;
}

export function ContactFormModal({ isOpen, onClose }: ContactFormModalProps) {
  const [formName, setFormName] = useState('');
  const [termsEnabled, setTermsEnabled] = useState(false);
  const [termsUrl, setTermsUrl] = useState('');
  const [fields, setFields] = useState<FormField[]>([
    { id: 'name', label: 'Nombres y apellidos', show: true, required: true },
    { id: 'phone', label: 'Número de teléfono', show: false, required: false },
    { id: 'email', label: 'Correo electrónico', show: true, required: true },
    { id: 'company', label: 'Nombre de empresa', show: true, required: false },
    { id: 'country', label: 'País', show: true, required: false },
    { id: 'message', label: 'Mensaje', show: true, required: false },
  ]);
  const [thankYouMessage, setThankYouMessage] = useState('¡Gracias!');

  const toggleShow = (id: string) => {
    setFields(fields.map(field => 
      field.id === id ? { ...field, show: !field.show } : field
    ));
  };

  const toggleRequired = (id: string) => {
    setFields(fields.map(field => 
      field.id === id ? { ...field, required: !field.required } : field
    ));
  };

  const handleSubmit = () => {
    console.log({ formName, fields, thankYouMessage, termsEnabled, termsUrl });
    alert('Formulario creado exitosamente!');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Formulario de contacto" maxWidth="xl">
      <div className="space-y-4">
        {/* Nombre del formulario */}
        <div>
          <label className="block text-xs font-medium text-[#1e293b] mb-1">
            Nombre de formulario
          </label>
          <input
            type="text"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            placeholder="Introducir nombre del formulario"
            className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#002084] focus:border-transparent"
          />
        </div>

        {/* Administrador */}
        <div>
          <h3 className="text-xs font-semibold text-[#1e293b] mb-0.5">Administrador</h3>
          <p className="text-[11px] text-slate-500 mb-2">
            Seleccione los campos que desea incluir en el formulario de contacto
          </p>

          {/* Tabla de campos */}
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-3 py-2 text-[11px] font-medium text-slate-600">Campo</th>
                  <th className="text-center px-3 py-2 text-[11px] font-medium text-slate-600">Mostrar</th>
                  <th className="text-center px-3 py-2 text-[11px] font-medium text-slate-600">Obligatorio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {fields.map((field) => (
                  <tr key={field.id} className="hover:bg-slate-50">
                    <td className="px-3 py-2 text-slate-700">{field.label}</td>
                    <td className="px-3 py-2 text-center">
                      <input
                        type="checkbox"
                        checked={field.show}
                        onChange={() => toggleShow(field.id)}
                        className="w-3.5 h-3.5 text-[#002084] border-slate-300 rounded focus:ring-[#002084]"
                      />
                    </td>
                    <td className="px-3 py-2 text-center">
                      <button
                        onClick={() => toggleRequired(field.id)}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                          field.required ? 'bg-[#002084]' : 'bg-slate-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                            field.required ? 'translate-x-5' : 'translate-x-0.5'
                          }`}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mensaje de agradecimiento */}
        <div>
          <label className="block text-xs font-medium text-[#1e293b] mb-1">
            Mensaje de agradecimiento
          </label>
          <input
            type="text"
            value={thankYouMessage}
            onChange={(e) => setThankYouMessage(e.target.value)}
            placeholder="¡Gracias!"
            className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#002084] focus:border-transparent"
          />
        </div>

        {/* Términos y condiciones */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-medium text-[#1e293b]">
              Términos y condiciones personalizados
            </label>
            <button
              onClick={() => setTermsEnabled(!termsEnabled)}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                termsEnabled ? 'bg-[#002084]' : 'bg-slate-300'
              }`}
            >
              <span
                className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                  termsEnabled ? 'translate-x-5' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
          {termsEnabled && (
            <input
              type="text"
              value={termsUrl}
              onChange={(e) => setTermsUrl(e.target.value)}
              placeholder="https:// Añadir enlace"
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#002084] focus:border-transparent"
            />
          )}
        </div>

        {/* Botón crear */}
        <div className="flex justify-center pt-2">
          <Button onClick={handleSubmit} className="px-8 py-2 text-sm">
            Crear formulario
          </Button>
        </div>
      </div>
    </Modal>
  );
}
