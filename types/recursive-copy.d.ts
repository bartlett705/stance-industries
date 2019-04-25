export = index;
declare function index(src: any, dest: any, options: any, callback?: any, ...args: any[]): any;
declare namespace index {
  const events: {
    COMPLETE: string;
    COPY_FILE_COMPLETE: string;
    COPY_FILE_ERROR: string;
    COPY_FILE_START: string;
    CREATE_DIRECTORY_COMPLETE: string;
    CREATE_DIRECTORY_ERROR: string;
    CREATE_DIRECTORY_START: string;
    CREATE_SYMLINK_COMPLETE: string;
    CREATE_SYMLINK_ERROR: string;
    CREATE_SYMLINK_START: string;
    ERROR: string;
  };
}
