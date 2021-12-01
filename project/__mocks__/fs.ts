import path from "path";

let mockFiles = Object.create(null);
const setMockFiles = (newMockFiles: Object): FileList => {
  mockFiles = Object.create(null);
  for (const file in newMockFiles) {
    const dir = path.dirname(file);

    if (!mockFiles[dir]) {
      mockFiles[dir] = [];
    }
    mockFiles[dir].push(path.basename(file));
  }
  return mockFiles;
};

export { setMockFiles };
