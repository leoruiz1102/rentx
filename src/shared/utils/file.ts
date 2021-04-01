import fs from "fs";

export const deleteFile = async (filename: string) => {
  try {
    await fs.promises.stat(filename);
  } catch (error) {
    return; // eslint-disable-line
  }

  await fs.promises.unlink(filename);
};
