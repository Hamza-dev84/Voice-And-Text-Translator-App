import React, { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import "./Translator.css";


import { MdLightMode, MdDarkMode } from "react-icons/md"mja;
import {
    FaCopy,
    FaVolumeUp,
    FaMicrophoneAlt,
    FaFileUpload,
    FaDownload,
    FaImage,
    FaShareSquare,
    FaGlobe,
    FaBroom,
    FaTimes,
    FaWhatsapp,
} from "react-icons/fa";

const VoiceTextTranslator = () => {

    const [dark, setDark] = useState(false);
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [voiceLang, setVoiceLang] = useState("en");
    const [targetLang, setTargetLang] = useState("en");
    const [openModal, setOpenModal] = useState(false);
    const [voices, setVoices] = useState([]);
  

          /  //   const recogRef = useRef(null);


    useEffect(() => {
        if ("webkitSpeechRecognition" in window) {B..........BVN  
            recogRef.current = new window.webkitSpeechRecognition();
        } else if ("SpeechRecognition" in window) {
            recogRef.current = new window.SpeechRecognition();
        }

        if (recogRef.current) {
            recogRef.current.continuous = false;
            recogRef.current.interimResults = false;
            recogRef.current.onresult = (e) =>
                setInput((prev) => prev + e.results[0][0].transcript + " ");
            recogRef.current.onerror = (e) =>
                alert("Voice recognition error: " + e.error);
        }


        const loadVoices = () => '"""""""""""""""""""""""""""""""""""""'''''''''''''''''''''\h         nnnnnnnnnnnn{
            const synthVoices = speechSynthesis.getVoices();
            if (synthVoices.length) {
                setVoices(synthVoices);
            }
        };

        loadVoices();

        speechSynthesis.onvoiceschanged = loadVoices;
    }, []);

    const startVoice = () => {
        if (!recogRef.current) return;
        recogRef.current.lang = voiceLang;
        recogRef.current.start();
    };


    const copyText = txt => {
        navigator.clipboard.writeText(txt);
        alert("Text copied to clipboard!");
    };

    const speak = (txt, lang) => {
        if (!txt.trim()) {
            return alert("No text to speak!");
        }

        const voice = voices.find((v) => v.lang.startsWith(lang)) || null;

        const utter = new SpeechSynthesisUtterance(txt);
        utter.voice = voice;
        utter.lang = voice ? voice.lang : lang;
        speechSynthesis.speak(utter);
    };


    const clearAll = () => {
        setInput("");
        setOutput("");
        alert("All text cleared!");
    };




    const translate = async () => {
        if (!input.trim()) return alert("Enter text first!");
        const url =
            "https://translate.googleapis.com/translate_a/single?client=gtx" +
            `&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(input)}`;
        try {
            const res = await fetch(url);
            const data = await res.json();
            setOutput(data[0].map((d) => d[0]).join(""));
        } catch {
            alert("Translation failed. Try again.");
        }
    };


    const downloadTxt = () => {
        if (!input && !output) return;
        const blob = new Blob([`Input:\n${input}\n\nOutput:\n${output}`], {
            type: "text/plain",
        });
        const a = Object.assign(document.createElement("a"), {
            href: URL.createObjectURL(blob),
            download: "translation.txt",
        });
        a.click();
        URL.revokeObjectURL(a.href);
    };

    const downloadImg = async () => {
        if (!input && !output) return;
        const div = document.createElement("div");
        div.style.cssText =
            "padding:20px;font-family:Arial;width:100%;max-width:500px";
        div.innerHTML = `<h3>Input</h3><p>${input || "—"}</p>
                     <h3>Output</h3><p>${output || "—"}</p>`;
        document.body.appendChild(div);
        const canvas = await html2canvas(div);
        const link = document.createElement("a");
        link.download = "translation.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
        document.body.removeChild(div);
    };

    const uploadFile = (e) => {
        const file = e.target.files[0];
        if (!file || file.type !== "text/plain") {
            alert("Upload a .txt file");
            return;
        }
        const reader = new FileReader();
        reader.onload = (ev) => setInput(ev.target.result);
        reader.readAsText(file);
    };

    const share = () => {
        if (!input && !output) return;
        const txt = `Input:\n${input || "—"}\n\nOutput:\n${output || "—"}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(txt)}`, "_blank");
    };


    const langs = [
        { code: "en", label: "English" },
        { code: "ur", label: "Urdu" },
        { code: "hi", label: "Hindi" },
        { code: "fr", label: "French" },
        { code: "es", label: "Spanish" },
        { code: "de", label: "German" },
        { code: "ar", label: "Arabic" },
        { code: "zh-CN", label: "Chinese (Simplified)" },
        { code: "ru", label: "Russian" },
        { code: "ja", label: "Japanese" },
        { code: "ko", label: "Korean" },
        { code: "it", label: "Italian" },
        { code: "pt", label: "Portuguese" },
        { code: "tr", label: "Turkish" },
        { code: "fa", label: "Persian (Farsi)" },
        { code: "ps", label: "Pashto" },
        { code: "id", label: "Indonesian" },
        { code: "ms", label: "Malay" },
        { code: "ta", label: "Tamil" },
        { code: "te", label: "Telugu" },
        { code: "bn", label: "Bengali" },
        { code: "pa", label: "Punjabi" },
        { code: "gu", label: "Gujarati" },
        { code: "pl", label: "Polish" },
        { code: "nl", label: "Dutch" },
        { code: "ro", label: "Romanian" },
        { code: "sv", label: "Swedish" },
        { code: "uk", label: "Ukrainian" },
        { code: "vi", label: "Vietnamese" },
        { code: "th", label: "Thai" },
    ];


    return (
        <div className={dark ? "dark-mode" : ""}>

            <header className="navbar">
                <h1>

                    Voice & Text Translator App
                </h1>
                <button onClick={() => setDark(!dark)}>
                    {dark ? <MdLightMode /> : <MdDarkMode />}
                </button>
            </header>

            <main className="wrapper">

                <section className="section">
                    <div className="section__header">
                        <h2>Input</h2>
                        <div className="controls">
                            <button onClick={startVoice}>
                                <FaMicrophoneAlt className="icon" />
                                input voice
                            </button>
                            <select
                                value={voiceLang}
                                onChange={(e) => setVoiceLang(e.target.value)}
                            >
                                {langs.map((l) => (
                                    <option key={l.code} value={l.code}>
                                        {l.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="textarea-wrapper">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type or speak here…"
                        />
                        <div className="action-buttons">
                            <button onClick={() => speak(input, voiceLang)}>
                                <FaVolumeUp />
                            </button>
                            <button onClick={() => copyText(input, "input")}>
                                <FaCopy />
                            </button>

                        </div>
                    </div>
                </section>


                <div className="btn-group">
                    <label className="file-label">
                        <FaFileUpload className="icon" />
                        Upload .txt file
                        <input
                            type="file"
                            accept=".txt"
                            onChange={uploadFile}
                            className="file-input"
                        />
                    </label>

                    <button onClick={downloadTxt}>
                        <FaDownload className="icon" />
                        Download .txt file
                    </button>

                    <button onClick={downloadImg}>
                        <FaImage className="icon" />
                        Download image
                    </button>

                    <button onClick={() => setOpenModal(true)}>
                        <FaShareSquare className="icon" />
                        Share
                    </button>
                </div>


                <section className="section">
                    <div className="section__header">
                        <h2>Output</h2>
                        <div className="controls">
                            <button onClick={translate}>
                                <FaGlobe className="icon" />
                                Translate
                            </button>
                            <select
                                value={targetLang}
                                onChange={(e) => setTargetLang(e.target.value)}
                            >
                                {langs.map((l) => (
                                    <option key={l.code} value={l.code}>
                                        {l.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="textarea-wrapper">
                        <textarea readOnly value={output} placeholder="Translation…" />
                        <div className="action-buttons">
                            <button onClick={() => speak(output, targetLang)}>
                                <FaVolumeUp />
                            </button>
                            <button onClick={() => copyText(output, "output")}>
                                <FaCopy />
                            </button>

                        </div>
                    </div>
                </section>

                <button className="_clear-btn" onClick={clearAll}>
                    <FaBroom className="icon" />
                    Clear
                </button>
            </main>


            {openModal && (
                <div className="modal" onClick={() => setOpenModal(false)}>
                    <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <span className="close" onClick={() => setOpenModal(false)}>
                            <FaTimes />
                        </span>
                        <h3>
                            <FaShareSquare className="icon" />
                            Share
                        </h3>
                        <button className="share-btn whatsapp" onClick={share}>
                            <FaWhatsapp className="icon" />
                            WhatsApp
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VoiceTextTranslator;
