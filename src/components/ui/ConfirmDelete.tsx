import Modal from './Modal';

interface Props {
  name: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDelete({ name, onConfirm, onCancel }: Props) {
  return (
    <Modal title="Confirmar eliminación" onClose={onCancel}>
      <p className="text-slate-600 text-sm mb-6">
        ¿Estás seguro de que deseas eliminar <strong>"{name}"</strong>?
        Esta acción no se puede deshacer.
      </p>
      <div className="flex gap-3 justify-end">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-sm rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
        >
          Cancelar
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 text-sm rounded-lg bg-rose-500 text-white hover:bg-rose-600 transition-colors"
        >
          Eliminar
        </button>
      </div>
    </Modal>
  );
}
