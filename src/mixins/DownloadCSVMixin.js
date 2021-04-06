import { ExportToCsv } from 'export-to-csv';

const options = {
  fieldSeparator: ',',
  quoteStrings: '"',
  decimalSeparator: '.',
  showLabels: true,
  showTitle: true,
  useTextFile: false,
  useBom: true,
  useKeysAsHeaders: true,
};

export default {
  name: 'DownloadCSVMixin',
  methods: {
    download(data, title) {
      if (!data) return false;
      const csvExporter = new ExportToCsv({ title, ...options });
      csvExporter.generateCsv(data);
      return true;
    },
  },
};
