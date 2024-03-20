const IPFS = require('ipfs-http-client');
const { globSource } = IPFS;

class IPFSPublisher {
    constructor(host = 'ipfs.infura.io', port = 5001, protocol = 'https') {
        this.ipfs = IPFS.create({ host, port, protocol });
    }

    async addFile(filePath, options = {}) {
        try {
            const file = globSource(filePath, options);
            const result = await this.ipfs.add(file);
            return result;
        } catch (error) {
            console.error('Error adding file to IPFS:', error);
            throw error;
        }
    }

    async getFile(cid) {
        try {
            const stream = this.ipfs.cat(cid);
            let data = '';

            for await (const chunk of stream) {
                data += chunk.toString();
            }

            return data;
        } catch (error) {
            console.error('Error retrieving file from IPFS:', error);
            throw error;
        }
    }
}

module.exports = IPFSPublisher;