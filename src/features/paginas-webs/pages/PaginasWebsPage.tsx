import { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import type { ColumnDef, PaginationState, SortingState } from '@tanstack/react-table';
import { Edit2, Eye, Trash2, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { MainLayout } from '../../../shared/components/layout/MainLayout';
import { Button, Badge } from '../../../shared/components';
import { ContactFormModal } from '../components/ContactFormModal';
import type { WebPage } from '../../../data/models/webpage';

const mockData: WebPage[] = [
  {
    id: 1,
    category: 'Landing Page',
    categoryIcon: '🎨',
    description: 'Página principal de productos con diseño moderno y responsivo',
    date: '2024-01-15',
    status: 'Imágenes',
  },
  {
    id: 2,
    category: 'Blog Corporativo',
    categoryIcon: '📝',
    description: 'Blog con artículos técnicos y noticias de la empresa',
    date: '2024-01-20',
    status: 'Documento',
  },
  {
    id: 3,
    category: 'Portafolio',
    categoryIcon: '💼',
    description: 'Galería de proyectos realizados para clientes',
    date: '2024-01-25',
    status: 'Videos',
  },
  {
    id: 4,
    category: 'E-commerce',
    categoryIcon: '🛒',
    description: 'Tienda online con catálogo de productos y carrito de compras',
    date: '2024-02-01',
    status: 'Imágenes',
  },
  {
    id: 5,
    category: 'Dashboard Admin',
    categoryIcon: '📊',
    description: 'Panel administrativo para gestión de contenidos',
    date: '2024-02-05',
    status: 'Documento',
  },
];

export default function PaginasWebsPage() {
  const [data] = useState<WebPage[]>(mockData);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [rowSelection, setRowSelection] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: ColumnDef<WebPage>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <input
          type="checkbox"
          checked={table.getIsAllRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
          className="w-4 h-4 border-slate-300 rounded text-[#002084] focus:ring-[#002084]"
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
          className="w-4 h-4 border-slate-300 rounded text-[#002084] focus:ring-[#002084]"
        />
      ),
    },
    {
      accessorKey: 'id',
      header: 'Nº',
      cell: ({ row }) => <span className="font-medium">{row.original.id}</span>,
    },
    {
      accessorKey: 'category',
      header: 'Categoría',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-xl">
            {row.original.categoryIcon}
          </div>
          <span className="font-medium text-[#1e293b]">{row.original.category}</span>
        </div>
      ),
    },
    {
      accessorKey: 'description',
      header: 'Descripción',
      cell: ({ row }) => (
        <span className="text-slate-600 line-clamp-2">{row.original.description}</span>
      ),
    },
    {
      accessorKey: 'date',
      header: 'Fecha',
      cell: ({ row }) => (
        <span className="text-slate-600">{new Date(row.original.date).toLocaleDateString('es-ES')}</span>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Etiqueta',
      cell: ({ row }) => {
        const status = row.original.status;
        const variantMap = {
          Imágenes: 'warning',
          Documento: 'success',
          Videos: 'info',
        } as const;
        return <Badge variant={variantMap[status]}>{status}</Badge>;
      },
    },
    {
      id: 'actions',
      header: 'Acciones',
      cell: () => (
        <div className="flex items-center gap-2">
          <button
            className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Editar"
          >
            <Edit2 size={16} className="text-slate-600" />
          </button>
          <button
            className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Ver"
          >
            <Eye size={16} className="text-slate-600" />
          </button>
          <button
            className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Eliminar"
          >
            <Trash2 size={16} className="text-red-500" />
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
      pagination,
      rowSelection,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <MainLayout title="Páginas Webs">
      {/* Controles de Cabecera */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm mb-6 p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Selector de cantidad */}
            <div className="flex items-center gap-2">
              <select
                value={table.getState().pagination.pageSize}
                onChange={(e) => table.setPageSize(Number(e.target.value))}
                className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#002084]"
              >
                {[5, 10, 20, 50].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <label className="text-sm text-slate-600">Datos por página</label>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Botón de filtro */}
            <Button variant="ghost" size="sm">
              <Filter size={18} className="mr-2" />
              Filtros
            </Button>

            {/* Botón de agregar */}
            <Button onClick={() => setIsModalOpen(true)}>Modal de Prueba</Button>
          </div>
        </div>
      </div>

      {/* Modal de formulario de contacto */}
      <ContactFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Tabla */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-slate-200">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4 text-sm">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <div className="text-sm text-slate-600">
            Mostrando {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} a{' '}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}{' '}
            de {table.getFilteredRowModel().rows.length} registros
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-600">
              Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="p-2 rounded-lg border border-slate-300 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Página anterior"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="p-2 rounded-lg border border-slate-300 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Página siguiente"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
