var child_process       = require("child_process");
const path              = require('path');
var fs                  = require('fs');
const xml2js            = require('xml2js');
const commonPath        = require('common-path');



export const WEBSITE_URL = 'https://glasswall-desktop.com';
export const RELEASE_URL = 'https://github.com/k8-proxy/glasswall-desktop/releases';
export const LICENSE_URL = 'https://github.com/k8-proxy/glasswall-desktop/blob/master/LICENSE';
export const FW_URL = 'https://forensic-workbench.com/';
export const FILE_DROP_URL = 'https://file-drop.co.uk/';
export const REPO_GIT_ISSUE_URL = "https://github.com/k8-proxy/glasswall-desktop/issues/new";

export const POLICY_BLOCKED_TXT = 'forbidden by content management policy'
export const VERSION = '1.0.0'

export const OUTPUT_DIR_FLAT = "flat";
export const OUTPUT_DIR_HIERARCY = "hierarcy";

//Storage Keys Starts
export const WELCOME_PAGE_VISTIED_KEY = "visited"
export const WELCOME_PAGE_VISTIED_VAL = "yes"


export const DOCKER_HEALTH_STATUS_KEY = "docker_health_status"

//Storage Keys ends
export const REBUILD_TYPE_CLOUD = "Cloud"
export const REBUILD_TYPE_DOCKER = "Docker"

export const TEXT_PARALLEL = "Parallel"
export const TEXT_SEQUENTIAL = "Sequential"
const REGEX_SAFE_FILE_NAME = /[^a-zA-Z0-9-_\.]/g
export const HEALTH_CHK_PNG_BASE64 = "iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4BAMAAADLSivhAAAAMFBMVEVAoaL///9Hpab4/PxUq6zv9/e43NzX6+ul09ORyclisrPj8fFyubrH4+SAwME/oaJIgbRbAAAEIUlEQVR4Xu3Zf2hbVRQH8LO3LG2y19rT7OU1S1/JWiIgKGayAoNJHooIK9A3BdlESGSiKMI6sYIyyGMVAXSmKAXBjXRMRBmYMBjCABJQBQQxyAQKYiqiKlD694AhL0lf7n3318vLn/YLFE7hk3O593BzIYAjZB/v4xN33rpzKxr++g/w8tDV4fHZb0Bb2tn59/ouJP8cDhtbu0v9jub7RUisDIOr2mWiWgOtHRobnUCr218ly2Fx6WkMxKzda4TDF+PIJFVLhMKZRAHZmM3TIbBxo4G8zOTKarzsIj/nEkpsfo6iVLZVeAuFsXQFttZRnDMtOb6EkmQnpdhYQVnqrhCrY8ZHwFgqjIDnbCk2Hal+UIKNj0Fbl+G6I8YlAIgVZOtuCfEseLFRkrwQdwD2Wmdf2fnnA84aXhXhDPSyjmg0AQD0Nxg83RDgeh9PIC5DN7FyEFstPk4VoU8Qa9CLzpxcno8t2Itr5MBfRSCf8PG0j/MDDMFjP8nHv/lgPDXAkwE8W+DiGvgpFEHU2nK5ODcAbgVErQ2bhy0YxJ4CYevPeHiOwGMZAsdp/DIPTxM4aQGRFQqf4uFHCaw5JF6g8CIP14FIu0pgncIzStyiP4rEaR6+QOJDx0l8kMSWEsePgnDdSjw5A6L9VuNYisLHhsLgFEk8Phx2O1Q5HLYrFN5W4DqFF36iSwVepnCeLicVeIrCY14Za/hT2pDjIxQeP+r9GXyiK8cZCutemRhsxAE5NimspT2y4Z92Qo4RqJh0GVPgIoWfBzptOaZn6k0A7nin+Jgei7s5Go/1gcli9qBf8jG9YxkWs2f1bgBDH/zFxybd2VfUmBjHWMxu92tBvNmbQ5fF7HXwugfYW7DiCDB16Z31AHObmDoKsLU7ANp0EGvdVR8UYWwSfeoeYK7Q2roQE2ChCpztngMU4rQP7i0CExuxEw9gdt1Xvry5UmHxJmbAluDeLj3y3up1YONgUytIcBbEyeNJmEAGi+ZEI8c75pgArhSnCfvDYydK5LOmCjpKMZZ8+8W1H6/ii3v2ezwPsKnAJnUHPIxr3Tr2Lb4NkEQFxjNA5nTqhU+fXNp4BtcA4AklNpqU/s7xwKr3z/tZJcYZoBLb+OVKrbdl59QYnwVuxrI5R43xPM/qTgnaITD+zlqt/Dg84IbBqQ8ZfDmdA9hmMFevBfp+lK6BaEjYbFFzXV7slnZIjM91/BvtqVtY5T7HAIW5fe3G/Pz8zb9/9h8sB3hYndlRsNHFh6NhLI6Cm6PgSlRs/Hq392w4FAFfAGgvR9xt02NTQw0J/c0bPwLc2VbGW3GiOyWt4XEJALQudrlYfUrHPdyI0rmfJIbG7ONuIgKe28N2BJzqW60QGrNPlcMYBRs1z+qFSBitIoDuYDSMxqV3/r8/v+zj/wCkvAtd4Bni/AAAAABJRU5ErkJggg==";
export const HEALTH_CHK_PNG_NAME = "test.png";



export const sleepDelay = (milliseconds: number) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export const sleep = (delay: number) => {
  var start = new Date().getTime();
  while (new Date().getTime() < start + delay);
}

const _p8 = (s: boolean) => {
 var p = (Math.random().toString(16) + "000000000").substr(2, 8);
  return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
}

export const guid = () => {
  return _p8(false);
}

export const wordwrap = (str: string, width: number, brk: string, cut: boolean) => {

  brk = brk || 'n';
  width = width || 75;
  cut = cut || false;

  if (!str) { return str; }

  var regex = '.{1,' + width + '}(\s|$)' + (cut ? '|.{' + width + '}|.+$' : '|\S+?(\s|$)');

  let res = str && regex && str.match(RegExp(regex, 'g') || "")
  if (res) {
    console.log("wordwrap" + res.join(brk))
    return res.join(brk);
  }
}

export const stipFileExt = (filename: string) => {
  return filename.split('.').slice(0, -1).join('.')
}

export const getFileHash = (content: string) => {
  var crypto = require('crypto');
  // change to 'md5' if you want an MD5 hash
  var hash = crypto.createHash('sha1');

  // change to 'binary' if you want a binary hash.
  hash.setEncoding('hex');

  // the text that you want to hash
  hash.write(content);

  // very important! You cannot read from the stream until you have called end()
  hash.end();

  // and now you get the resulting hash
  var sha1sum = hash.read();
  return sha1sum;
}





export const getPathSep = () => {
  return path.sep;
}


export const xml_parser = async (xml_data: string) => {
  return new Promise(function (resolve, reject) {
    const parser = new xml2js.Parser();
    console.log('xml_data = ' + xml_data)
    parser.parseString(xml_data, function (err: Error, result: any) {
      if (err) {
        console.log('xml_data err = ' + err.stack)
        reject(err);
      } else {
        console.log('xml_data jsonresult = ' + JSON.stringify(result))
        resolve(result);
      }
    });
  });
}

export const getAppDataPath = () => {
  switch (process.platform) {
    case "darwin": {
      return path.join(process.env.HOME, "Library", "Application Support", "glasswall-desktop");
    }
    case "win32": {
      return path.join(process.env.APPDATA, "glasswall-desktop");
    }
    case "linux": {
      return path.join(process.env.HOME, ".glasswall-desktop");
    }
    default: {
      console.log("Unsupported platform!");
      // process.exit(1);
    }
  }
}

//save base64 file 
export const saveBase64File = async (content: string, filePath: string, filename: string) => {
  //console.log("filePath 1" + filePath)
  !fs.existsSync(filePath) && fs.mkdirSync(filePath, { recursive: true })
  fs.writeFile(filePath + getPathSep() + filename, content, { encoding: 'base64' }, function (err: any) {
    if (err) {
      console.log('err', err);
    }
  });
}

//save any text file 
export const saveTextFile = async (xmlContent: string, filePath: string, filename: string) => {
  //console.log("filePath 2" + filePath)
  !fs.existsSync(filePath) && fs.mkdirSync(filePath, { recursive: true })
  fs.writeFile(filePath + getPathSep() + filename, xmlContent, function (err: any) {
    if (err) {
      console.log('err', err);
    }
  });
}

export const open_file_exp = (fpath: string) => {
  console.log("open_file_exp" + fpath)
  var command = '';
  switch (process.platform) {
    case 'darwin':
      command = 'open -R ' + "\'" + fpath + "\'";
      break;
    case 'win32':
      if (process.env.SystemRoot) {
        command = path.join(process.env.SystemRoot, 'explorer.exe');
      } else {
        command = 'explorer.exe';
      }
      fpath = fpath.replace(/\//g, '\\');
      command += ' /select, ' + fpath;
      break;
    default:
      fpath = path.dirname(fpath)
      command = 'xdg-open ' + fpath;
  }
  child_process.exec(command, function (stdout: any) {
  });
}

export const sanitize_file_name = (file_name: string) => {
  if (typeof (file_name) !== 'string') {
    throw new Error(`[sanitize_file_name] provided value was now a string, it was ${typeof (file_name)}`)
  }
  return file_name.replace(REGEX_SAFE_FILE_NAME, '_')
}




export const file_size_as_string = (file_size: number) => {

  //Found one bug: file_size type is coming as string to explicitly convert it to Number
  file_size = Number(file_size)

  if (typeof (file_size) !== 'number') {
    return "0 KB"
  }
  if (Math.round(file_size / 1024) == 0) {
    return "1 KB"
  }
  return (file_size / (1024 * 1024 * 1024 - 1) <= 1)
    ? ((file_size / (1024 * 1024 - 1) <= 1)
      ? Math.round(file_size / 1024) + " KB"
      : Math.round(file_size / 1048576) + " MB")
    : Math.round(file_size / 1073741824) + " GB"
}


export const getHieracyPath = (filePath: any, userTargetDir: string, allPath: string[]) => {
  let targetPath: string;
  targetPath = userTargetDir;
  const common = commonPath(allPath);
  common.parsedPaths.map((cPath: any) => {
    if (cPath.original == filePath) {
      targetPath = userTargetDir + getPathSep() + cPath.subdir;
    }

  });
  console.log("getHieracyPath" + targetPath)
  return targetPath;
}

export const isBlockedByPolicy = (filePath: string) => {
  let data = fs.readFileSync(filePath,
    { encoding: 'utf8', flag: 'r' });
  return data.indexOf(POLICY_BLOCKED_TXT) > -1;
}

export const isBlockedByPolicyMsg = (message: string) => {
  return message.indexOf(POLICY_BLOCKED_TXT) > -1;
}


export const removeHttps = (link: string) =>{ 
  return link.replace(/^(https?:|)\/\//, '');
  };

