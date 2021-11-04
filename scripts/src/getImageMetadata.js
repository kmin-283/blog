import {readdir, readFile} from 'fs/promises';

const FILE_DIR = '../project/mds/';

const getFiles = async () => {
    try {
      return await readdir(FILE_DIR);
    } catch (err) {
      console.error(err);
    }
  }
;

const getImageMetadata = async () => {
  const files = await getFiles();
  return Promise.all(files.map(async (file) => {
    const f = await readFile(FILE_DIR + file, 'utf-8');
    if (!f) {
      return [];
    }
    const imageTags = f.match(/!\[[^()[\]]*\]\([^)]+\)/g);
    return imageTags.map((imageTag) => {
      let alt = "", source = "", title = "";
      const _alt = imageTag.match(/!\[.*]/)[0];
      const _source = imageTag.match(/\([^\s]*\)?/)[0];
      const _title = imageTag.match(/".*"/);

      alt = _alt.slice(2, -1);
      source = _source[_source.length - 1] !== ')' ? _source.slice(1) : _source.slice(1, -1);
      title = !_title ? "" : _title[0].slice(1, -1);
      return {
        alt,
        source,
        title,
      };
    });
  }));
};

export default getImageMetadata;