export const exportToCSV = (data, filename) => {
    if (!data || !data.length) return;
    
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(obj => 
        Object.values(obj).map(val => 
            typeof val === 'object' ? JSON.stringify(val).replace(/,/g, ';') : val
        ).join(',')
    ).join('\n');

    const csvContent = "data:text/csv;charset=utf-8," + headers + "\n" + rows;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
};
