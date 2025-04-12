'use client';

import { useState } from "react";
import styles from '@/app/styles/ehr.module.css';
import { ethers } from "ethers";

const UploadRecordForm = ({
    contract
}: {
    contract: ethers.Contract | null;
}) => {
    const [file, setFile] = useState<File | null>(null);
    const [fileDescription, setFileDescription] = useState('');
    const [ipfsUrl, setIpfsUrl] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [fileUploadStatus, setFileUploadStatus] = useState<"notSelected" | "uploading" | "uploaded" | "uploadFailure">("notSelected");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleFileDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFileDescription(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!file) {
            alert("Please select a file first.");
            return;
        }

        if(!contract) {
            alert("No valid contract detected.");
            return;
        }

        try {
            setUploading(true);
            setFileUploadStatus("uploading");

            let signedUrl: string | null = null;

            try {
                const data = new FormData();
                data.set("file", file);
                const uploadRequest = await fetch("/api/files", {
                    method: "POST",
                    body: data,
                });
                signedUrl = await uploadRequest.json();
                if (!signedUrl) {
                    throw new Error("Failed to retrieve IPFS URL");
                }
                console.log("Signed Url: ", signedUrl);
                setIpfsUrl(signedUrl);
            } catch (error) {
                console.error(error);
                setUploading(false);
                setFileUploadStatus("uploadFailure");
                alert("trouble uploading file");
                return;
            }

            // store the hash URL to blockchain
            const tx = await contract.addMedicalRecord(fileDescription, signedUrl);
            await tx.wait();

            setFileUploadStatus("uploaded");
        } catch (error) {
            console.error("Transaction failed:", error);
            setUploading(false);
            setFileUploadStatus("uploadFailure");
        }
    };

    return (
        <div className={styles.uploadForm}>
            <form onSubmit={handleSubmit}>
                <h3 className={styles.uploadFormHeader}>Upload a medical record</h3>
                <div className={styles.uploadFormElements}>
                    <textarea className={styles.uploadFormDescription} name="description" placeholder="File Description" value={fileDescription} onChange={handleFileDescriptionChange} required></textarea>
                    <input className={styles.uploadFormInput} type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange}></input>
                </div>
                <button className={styles.uploadFormButton} type="submit" disabled={uploading}>Upload</button>
            </form>
            { fileUploadStatus === "uploaded" ? (
                <p>File uploaded successfully</p> 
            ) : fileUploadStatus === "uploading" ? (
                <p>Uploading file...</p>
            ) : fileUploadStatus === "uploadFailure" ? (
                <p>Could not upload file</p>
            ) : <p></p>
            }
        </div>
    );
};

export default UploadRecordForm;