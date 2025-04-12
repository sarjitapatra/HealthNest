import { ethers } from "ethers";
import { contractAddress, contractABI } from '@/constants/contract';

const Contract = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    return contract;
};

export default Contract;