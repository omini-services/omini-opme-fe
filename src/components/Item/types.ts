export interface IFormData {
  code: string;
  name: string;
  salesName: string;
  description: string;
  uom: string;
  anvisaCode: string;
  anvisaDueDate: Date | null;
  supplierCode: string;
  cst: string;
  susCode: string;
  ncmCode: string;
}

export interface IFormProps {
  open: Boolean;
  initialData?: IFormData;
  handleClose: Function;
  callbackAfterSubmit: Function;
}
