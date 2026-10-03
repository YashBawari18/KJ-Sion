export type Language = 'en' | 'es' | 'hi' | 'fr' | 'de' | 'ja';

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
];

export const translations = {
  en: {
    // Header & Brand
    appName: "Thumbnail IQ",
    taglineShort: "Predicted Attention Heatmap",
    problemBadge: "PS 2 · AI/ML",
    tabAnalyze: "Analyze",
    tabResults: "Results",
    tabCreator: "AI Creator",
    tabBattle: "Feed Battle",
    tabCompare: "Compare",
    tabDemo: "Demo",
    tabGuide: "Guide",
    btnNewAnalysis: "New Analysis",
    selectLanguage: "Language",
    preloaderInit: "Initializing Neural Attention Engine...",
    preloaderCalibrate: "Calibrating Visual Saliency & Heatmap Nodes...",
    preloaderReady: "Ready to Optimize Your Thumbnails!",
    disclaimerShort: "Predicted Attention (Not Eye Tracking)",
    apiReady: "API Ready",
    apiOffline: "API Offline",
    apiChecking: "Checking API...",

    // Hero
    heroPill: "Understand attention. Improve the thumbnail. Before you publish.",
    heroTitlePrefix: "Where will viewers look ",
    heroTitleGradient: "in the first 500ms?",
    heroSubtitle: "AI-powered predicted visual attention analysis for YouTube thumbnails. Diagnose fixation hotspots, trace viewer scan journeys, and optimize your visual hierarchy before you post.",
    ctaAnalyze: "Analyze Thumbnail",
    ctaDemos: "Try 3 Demo Samples",

    // Features
    featHeatmapTitle: "Attention Heatmap",
    featHeatmapSub: "Signal fusion map",
    featJourneyTitle: "Attention Journey",
    featJourneySub: "Scan path sequence",
    featMobileTitle: "Mobile Previews",
    featMobileSub: "168px feed card check",
    featScoreTitle: "Design Score",
    featScoreSub: "Prototype score /100",

    // Upload
    uploadClickText: "Click to upload",
    uploadDragText: "or drag and drop your thumbnail",
    uploadFormats: "PNG, JPG, JPEG, or WebP · High quality (1280×720 recommended) · Max 10MB",
    uploadSelected: "Selected:",
    uploadBrowse: "Browse File",
    uploadAnalyzingTitle: "Running Attention Fusion Pipeline...",
    uploadAnalyzingSubtitle: "Computing visual saliency, face fixations, text contrast, and scanpath sequence.",
    uploadStepValidating: "Validating",
    uploadStepSaliency: "CV Saliency",
    uploadStepHeatmap: "Heatmap",
    uploadErrorTitle: "Upload or Analysis Failed",
    uploadDismiss: "Dismiss",
    noThumbnailNotice: "Don't have a thumbnail ready?",
    trySamplesLink: "Try our 3 synthetic demo samples →",

    // Demos
    demoBadge: "Interactive Demos",
    demoHeading: "Try Pre-generated Synthetic Thumbnails",
    demoSubheading: "Select one of our 3 diverse test thumbnails. Each thumbnail exercises different CV signals (faces, typography, and object contrast).",
    demoFaceTitle: "Face-Heavy Subject",
    demoFaceSub: "Shocked reaction face with high-contrast text banner",
    demoFaceBadge: "Face Dominant",
    demoTextTitle: "Text-Heavy Headline",
    demoTextSub: "High-contrast typography with system checklist badges",
    demoTextBadge: "Typography Dominant",
    demoProductTitle: "Product / Gear Showcase",
    demoProductSub: "Center-stage gadget showcase with pedestal rim lighting",
    demoProductBadge: "Object / Lighting",
    demoActionAnalyze: "Analyze Sample →",

    // Dashboard
    diagTitle: "Analysis Diagnostics:",
    diagAspect: "Dimensions:",
    btnAnalyzeAnother: "Analyze Another",
    btnExportReport: "Export Report",
    modeOverlay: "Attention Heatmap",
    modeOriginal: "Original Image",
    modeSplit: "Side-by-Side",
    labelOpacity: "Heatmap Opacity:",
    labelIntensity: "Fixation Intensity:",
    intensityHigh: "High",
    intensityMed: "Med",
    intensityLow: "Low",
    originalUploadLabel: "Original Upload",
    predictedOverlayLabel: "Predicted Attention Overlay",

    // Score & Breakdown
    scoreTitle: "Attention Score",
    scoreIndexLabel: "Prototype Heuristic Design Index",
    scoreMetricNote: "Combined weighted model estimating viewer fixation strength.",
    scorePrototypeDisclaimer: "Weights represent initial prototype engineering heuristics; not validated clinical gaze statistics.",
    signalBreakdown: "Signal Breakdown",
    signalWeights: "Engine Weight · Score",
    sigSaliency: "Visual Saliency",
    sigFace: "Face / Emotion Saliency",
    sigText: "Text Legibility & Weight",
    sigContrast: "Edge & Luminance Contrast",
    sigColor: "Color Saturation & Vibrancy",
    sigComposition: "Composition & Framing",

    // Journey
    journeyTitle: "Predicted Attention Journey",
    journeySubtitle: "Predicted Sequential Fixation Order",
    journeyInteractiveNote: "Click any step to highlight position on image",
    journeyInteractiveTag: "Interactive",

    // Why & Recommendations
    whyTitle: "Why Viewers Look Here",
    whySubtitle: "Heuristic visual psychology drivers",
    recsTitle: "Actionable Recommendations",
    recsSubtitle: "Fix competing elements & enhance scan path",
    btnAiExplain: "Deep-Dive AI Explanation",
    btnAiConsulting: "Consulting AI...",
    aiDiagnosisBadge: "AI Visual Attention Diagnosis",

    // Feed Simulator
    feedTitle: "Real YouTube Feed Simulator",
    feedSubtitle: "Test small-screen legibility & timestamp occlusion",
    feedBadge168: "168px Mobile & Desktop",
    feedMobileLabel: "Mobile YouTube App (168px)",
    feedDesktopLabel: "Desktop YouTube Home (Compact)",
    feedProTip: "Pro-Tip: The bottom-right corner is reserved for YouTube duration badges. Keep logos, faces, and text clear of this area.",

    // Scientific Banner
    disclaimerBannerTitle: "Scientific Positioning Notice:",
    disclaimerBannerBody: "This software computes predicted visual attention using algorithmic computer vision heuristics (saliency maps, facial detection, contrast gradients, and central bias). It is not real physical eye-tracking data, does not measure human ocular fixations, and does not guarantee specific click-through rates (CTR) or conversions."
  },

  es: {
    // Header & Brand
    appName: "Thumbnail IQ",
    taglineShort: "Mapa de Calor de Atención Predicha",
    problemBadge: "PS 2 · IA/ML",
    tabAnalyze: "Analizar",
    tabResults: "Resultados",
    tabCreator: "Creador IA",
    tabBattle: "Batalla de Feed",
    tabCompare: "Comparar",
    tabDemo: "Demostración",
    tabGuide: "Guía",
    btnNewAnalysis: "Nuevo Análisis",
    selectLanguage: "Idioma",
    preloaderInit: "Iniciando Motor Neuronal de Atención...",
    preloaderCalibrate: "Calibrando Nodos de Prominencia Visual y Mapa de Calor...",
    preloaderReady: "¡Listo para Optimizar tus Miniaturas!",
    disclaimerShort: "Atención Predicha (No es Seguimiento Ocular)",
    apiReady: "API Lista",
    apiOffline: "API Desconectada",
    apiChecking: "Comprobando API...",

    // Hero
    heroPill: "Comprende la atención. Mejora la miniatura. Antes de publicar.",
    heroTitlePrefix: "¿Dónde mirarán los espectadores ",
    heroTitleGradient: "en los primeros 500ms?",
    heroSubtitle: "Análisis de atención visual predicha mediante IA para miniaturas de YouTube. Diagnostica zonas de fijación, analiza trayectorias visuales y optimiza la jerarquía visual antes de publicar.",
    ctaAnalyze: "Analizar Miniatura",
    ctaDemos: "Probar 3 Muestras Demo",

    // Features
    featHeatmapTitle: "Mapa de Atención",
    featHeatmapSub: "Fusión de señales",
    featJourneyTitle: "Trayectoria Visual",
    featJourneySub: "Secuencia de escaneo",
    featMobileTitle: "Vista Móvil",
    featMobileSub: "Prueba de tarjeta de 168px",
    featScoreTitle: "Puntuación de Diseño",
    featScoreSub: "Índice de prototipo /100",

    // Upload
    uploadClickText: "Haz clic para subir",
    uploadDragText: "o arrastra y suelta tu miniatura",
    uploadFormats: "PNG, JPG, JPEG o WebP · Alta resolución (1280×720 recomendado) · Máx 10MB",
    uploadSelected: "Seleccionado:",
    uploadBrowse: "Explorar Archivos",
    uploadAnalyzingTitle: "Ejecutando Pipeline de Fusión de Atención...",
    uploadAnalyzingSubtitle: "Calculando prominencia visual, caras, contraste de texto y trayectoria de escaneo.",
    uploadStepValidating: "Validando",
    uploadStepSaliency: "Prominencia CV",
    uploadStepHeatmap: "Mapa de Calor",
    uploadErrorTitle: "Fallo en la Carga o Análisis",
    uploadDismiss: "Descartar",
    noThumbnailNotice: "¿No tienes una miniatura lista?",
    trySamplesLink: "Prueba nuestras 3 muestras sintéticas →",

    // Demos
    demoBadge: "Demostraciones Interactivas",
    demoHeading: "Prueba Miniaturas Sintéticas Pre-generadas",
    demoSubheading: "Selecciona una de nuestras 3 miniaturas de prueba. Cada una ejercita señales de CV diferentes.",
    demoFaceTitle: "Sujeto con Rostro",
    demoFaceSub: "Rostro expresivo con texto de alto contraste",
    demoFaceBadge: "Rostro Dominante",
    demoTextTitle: "Titular con Texto",
    demoTextSub: "Tipografía masiva con etiquetas de lista",
    demoTextBadge: "Texto Dominante",
    demoProductTitle: "Producto / Gadget",
    demoProductSub: "Producto central con iluminación de pedestal",
    demoProductBadge: "Objeto / Iluminación",
    demoActionAnalyze: "Analizar Muestra →",

    // Dashboard
    diagTitle: "Diagnóstico de Análisis:",
    diagAspect: "Dimensiones:",
    btnAnalyzeAnother: "Analizar Otra",
    btnExportReport: "Exportar Reporte",
    modeOverlay: "Mapa de Calor",
    modeOriginal: "Imagen Original",
    modeSplit: "Lado a Lado",
    labelOpacity: "Opacidad del Mapa:",
    labelIntensity: "Intensidad de Fijación:",
    intensityHigh: "Alta",
    intensityMed: "Media",
    intensityLow: "Baja",
    originalUploadLabel: "Subida Original",
    predictedOverlayLabel: "Superposición de Atención Predicha",

    // Score & Breakdown
    scoreTitle: "Puntuación de Atención",
    scoreIndexLabel: "Índice de Diseño Heurístico de Prototipo",
    scoreMetricNote: "Modelo ponderado que estima la fuerza de fijación del espectador.",
    scorePrototypeDisclaimer: "Los pesos representan heurísticas de ingeniería de prototipo; no son estadísticas clínicas validadas.",
    signalBreakdown: "Desglose de Señales",
    signalWeights: "Peso del Motor · Puntuación",
    sigSaliency: "Prominencia Visual",
    sigFace: "Rostro / Emoción",
    sigText: "Legibilidad de Texto",
    sigContrast: "Contraste de Bordes",
    sigColor: "Saturación y Color",
    sigComposition: "Composición y Encuadre",

    // Journey
    journeyTitle: "Trayectoria de Atención Predicha",
    journeySubtitle: "Orden Secuencial de Fijación Predicho",
    journeyInteractiveNote: "Haz clic en cualquier paso para resaltar la posición",
    journeyInteractiveTag: "Interactivo",

    // Why & Recommendations
    whyTitle: "Por Qué Miran Aquí",
    whySubtitle: "Impulsores de psicología visual heurística",
    recsTitle: "Recomendaciones Accionables",
    recsSubtitle: "Corrige elementos en competencia y mejora el escaneo",
    btnAiExplain: "Explicación Detallada de IA",
    btnAiConsulting: "Consultando a la IA...",
    aiDiagnosisBadge: "Diagnóstico Visual de IA",

    // Feed Simulator
    feedTitle: "Simulador Real de YouTube",
    feedSubtitle: "Prueba legibilidad en pantallas pequeñas y oclusión de marca temporal",
    feedBadge168: "168px Móvil y Escritorio",
    feedMobileLabel: "App Móvil de YouTube (168px)",
    feedDesktopLabel: "YouTube de Escritorio (Compacto)",
    feedProTip: "Consejo: La esquina inferior derecha está reservada para el tiempo del video. Mantén esa área despejada.",

    // Scientific Banner
    disclaimerBannerTitle: "Aviso de Posicionamiento Científico:",
    disclaimerBannerBody: "Este software calcula atención visual predicha utilizando heurísticas algorítmicas de visión por computadora. No son datos reales de seguimiento ocular ni garantiza tasas de clics (CTR) o conversiones."
  },

  hi: {
    // Hindi
    appName: "Thumbnail IQ",
    taglineShort: "अनुमानित ध्यान हीटमैप",
    problemBadge: "PS 2 · AI/ML",
    tabAnalyze: "विश्लेषण करें",
    tabResults: "परिणाम",
    tabCreator: "AI क्रिएटर",
    tabBattle: "फ़ीड बैटल",
    tabCompare: "तुलना करें",
    tabDemo: "डेमो",
    tabGuide: "गाइड",
    btnNewAnalysis: "नया विश्लेषण",
    selectLanguage: "भाषा",
    preloaderInit: "न्यूरल अटेंशन इंजन शुरू हो रहा है...",
    preloaderCalibrate: "दृश्य हीटमैप नोड्स को कैलिब्रेट किया जा रहा है...",
    preloaderReady: "थंबनेल अनुकूलित करने के लिए तैयार!",
    disclaimerShort: "अनुमानित ध्यान (वास्तविक आई-ट्रैकिंग नहीं)",
    apiReady: "API तैयार है",
    apiOffline: "API ऑफ़लाइन है",
    apiChecking: "API जाँची जा रही है...",

    heroPill: "ध्यान समझें। थंबनेल सुधारें। प्रकाशित करने से पहले।",
    heroTitlePrefix: "दर्शक पहले 500 मिलीसेकंड में ",
    heroTitleGradient: "कहाँ देखेंगे?",
    heroSubtitle: "YouTube थंबनेल के लिए AI-संचालित अनुमानित दृश्य ध्यान विश्लेषण। प्रकाशित करने से पहले फिक्सेशन हॉटस्पॉट और व्यूअर स्कैन पाथ का विश्लेषण करें।",
    ctaAnalyze: "थंबनेल का विश्लेषण करें",
    ctaDemos: "3 डेमो नमूने आज़माएं",

    featHeatmapTitle: "अटेंशन हीटमैप",
    featHeatmapSub: "सिग्नल फ्यूजन मैप",
    featJourneyTitle: "अटेंशन जर्नी",
    featJourneySub: "स्कैन पाथ क्रम",
    featMobileTitle: "मोबाइल पूर्वावलोकन",
    featMobileSub: "168px फीड कार्ड चेक",
    featScoreTitle: "डिज़ाइन स्कोर",
    featScoreSub: "प्रोटोटाइप स्कोर /100",

    uploadClickText: "अपलोड करने के लिए क्लिक करें",
    uploadDragText: "या थंबनेल को यहाँ ड्रैग और ड्रॉप करें",
    uploadFormats: "PNG, JPG, JPEG या WebP · उच्च गुणवत्ता (1280×720 अनुशंसित) · अधिकतम 10MB",
    uploadSelected: "चयनित:",
    uploadBrowse: "फ़ाइल चुनें",
    uploadAnalyzingTitle: "अटेंशन फ्यूजन पाइपलाइन चल रही है...",
    uploadAnalyzingSubtitle: "विज़ुअल सेलियेंसी, चेहरे, टेक्स्ट कंट्रास्ट और स्कैनपाथ क्रम की गणना हो रही है।",
    uploadStepValidating: "सत्यापन",
    uploadStepSaliency: "CV सेलियेंसी",
    uploadStepHeatmap: "हीटमैप",
    uploadErrorTitle: "अपलोड या विश्लेषण विफल रहा",
    uploadDismiss: "खारिज करें",
    noThumbnailNotice: "क्या आपके पास थंबनेल तैयार नहीं है?",
    trySamplesLink: "हमारे 3 डेमो नमूने आज़माएं →",

    demoBadge: "इंटरएक्टिव डेमो",
    demoHeading: "सिंथेटिक थंबनेल आज़माएं",
    demoSubheading: "हमारे 3 विविध टेस्ट थंबनेल में से एक चुनें। प्रत्येक थंबनेल अलग-अलग CV सिग्नल का परीक्षण करता है।",
    demoFaceTitle: "चेहरे वाला विषय",
    demoFaceSub: "हाई-कंट्रास्ट टेक्स्ट के साथ प्रतिक्रियात्मक चेहरा",
    demoFaceBadge: "चेहरा प्रमुख",
    demoTextTitle: "टेक्स्ट-प्रमुख हेडलाइन",
    demoTextSub: "चेकलिस्ट बैज के साथ बोल्ड टाइपोग्राफी",
    demoTextBadge: "टेक्स्ट प्रमुख",
    demoProductTitle: "उत्पाद / गैजेट शोकेस",
    demoProductSub: "रिम लाइटिंग के साथ केंद्रीय कैमरा उत्पाद",
    demoProductBadge: "ऑब्जेक्ट / लाइटिंग",
    demoActionAnalyze: "नमूना जांचें →",

    diagTitle: "विश्लेषण निदान:",
    diagAspect: "आयाम:",
    btnAnalyzeAnother: "दूसरा विश्लेषण करें",
    btnExportReport: "रिपोर्ट निर्यात करें",
    modeOverlay: "अटेंशन हीटमैप",
    modeOriginal: "मूल छवि",
    modeSplit: "आमने-सामने तुलना",
    labelOpacity: "हीटमैप पारदर्शिता:",
    labelIntensity: "फिक्सेशन तीव्रता:",
    intensityHigh: "उच्च",
    intensityMed: "मध्यम",
    intensityLow: "कम",
    originalUploadLabel: "मूल अपलोड",
    predictedOverlayLabel: "अनुमानित ध्यान ओवरले",

    scoreTitle: "अटेंशन स्कोर",
    scoreIndexLabel: "प्रोटोटाइप डिज़ाइन सूचकांक",
    scoreMetricNote: "दर्शक के ध्यान की शक्ति का अनुमान लगाने वाला भारित मॉडल।",
    scorePrototypeDisclaimer: "प्रारंभिक इंजीनियरिंग अनुमान; क्लिनिकल आई-ट्रैकिंग डेटा नहीं।",
    signalBreakdown: "सिग्नल विश्लेषण",
    signalWeights: "इंजन वेटेज · स्कोर",
    sigSaliency: "विज़ुअल सेलियेंसी (आकर्षण)",
    sigFace: "चेहरा / भाव",
    sigText: "टेक्स्ट पठनीयता व वज़न",
    sigContrast: "कंट्रास्ट व किनारे",
    sigColor: "रंग व संतृप्ति (Saturation)",
    sigComposition: "संरचना व फ़्रेमिंग",

    journeyTitle: "अनुमानित ध्यान यात्रा (जर्नी)",
    journeySubtitle: "अनुमानित फिक्सेशन क्रम",
    journeyInteractiveNote: "छवि पर स्थिति हाइलाइट करने के लिए किसी भी चरण पर क्लिक करें",
    journeyInteractiveTag: "इंटरएक्टिव",

    whyTitle: "दर्शक यहाँ क्यों देखते हैं",
    whySubtitle: "दृश्य मनोविज्ञान के प्रेरक कारक",
    recsTitle: "व्यावहारिक सुधार सुझाव",
    recsSubtitle: "प्रतिस्पर्धी तत्वों को ठीक करें और स्कैन पाथ सुधारें",
    btnAiExplain: "विस्तृत AI स्पष्टीकरण",
    btnAiConsulting: "AI से परामर्श किया जा रहा है...",
    aiDiagnosisBadge: "AI दृश्य ध्यान निदान",

    feedTitle: "वास्तविक YouTube फ़ीड सिम्युलेटर",
    feedSubtitle: "छोटी स्क्रीन पर स्पष्टता और टाइमस्टैम्प की रुकावट जांचें",
    feedBadge168: "168px मोबाइल व डेस्कटॉप",
    feedMobileLabel: "YouTube मोबाइल ऐप (168px)",
    feedDesktopLabel: "YouTube डेस्कटॉप होम (कॉम्पैक्ट)",
    feedProTip: "प्रो-टिप: निचला दायाँ कोना वीडियो अवधि के लिए आरक्षित होता है। यहाँ चेहरे या टेक्स्ट न रखें।",

    disclaimerBannerTitle: "वैज्ञानिक सूचना:",
    disclaimerBannerBody: "यह सॉफ्टवेयर कंप्यूटर विज़न अनुमानों से दृश्य ध्यान की भविष्यवाणी करता है। यह वास्तविक आंखों की ट्रैकिंग नहीं है और सीटीआर (CTR) की गारंटी नहीं देता है।"
  },

  fr: {
    // French
    appName: "Thumbnail IQ",
    taglineShort: "Carte Thermique d'Attention Prédite",
    problemBadge: "PS 2 · IA/ML",
    tabAnalyze: "Analyser",
    tabResults: "Résultats",
    tabCreator: "Créateur IA",
    tabBattle: "Bataille de Flux",
    tabCompare: "Comparer",
    tabDemo: "Démo",
    tabGuide: "Guide",
    btnNewAnalysis: "Nouvelle Analyse",
    selectLanguage: "Langue",
    preloaderInit: "Initialisation du moteur d'attention neuronale...",
    preloaderCalibrate: "Calibration des nœuds de saillance visuelle...",
    preloaderReady: "Prêt à optimiser vos miniatures !",
    disclaimerShort: "Attention prédite (non oculaire)",
    apiReady: "API Prête",
    apiOffline: "API Hors Ligne",
    apiChecking: "Vérification API...",

    heroPill: "Comprenez l'attention. Améliorez la miniature. Avant de publier.",
    heroTitlePrefix: "Où regarderont les spectateurs ",
    heroTitleGradient: "dans les 500 premières ms ?",
    heroSubtitle: "Analyse prédictive de l'attention visuelle par IA pour miniatures YouTube. Diagnostiquez les zones de fixation et optimisez votre hiérarchie visuelle.",
    ctaAnalyze: "Analyser la Miniature",
    ctaDemos: "Essayer 3 Démos",

    featHeatmapTitle: "Carte de Chaleur",
    featHeatmapSub: "Fusion des signaux",
    featJourneyTitle: "Parcours Visuel",
    featJourneySub: "Séquence de balayage",
    featMobileTitle: "Aperçu Mobile",
    featMobileSub: "Carte de flux 168px",
    featScoreTitle: "Score de Design",
    featScoreSub: "Score prototype /100",

    uploadClickText: "Cliquez pour téléverser",
    uploadDragText: "ou glissez-déposez votre miniature",
    uploadFormats: "PNG, JPG, JPEG ou WebP · Haute qualité (1280×720 recommandé) · Max 10Mo",
    uploadSelected: "Sélectionné :",
    uploadBrowse: "Parcourir",
    uploadAnalyzingTitle: "Exécution du pipeline de fusion...",
    uploadAnalyzingSubtitle: "Calcul de la saillance visuelle, visages, contraste du texte et trajectoire.",
    uploadStepValidating: "Validation",
    uploadStepSaliency: "Saillance CV",
    uploadStepHeatmap: "Carte thermique",
    uploadErrorTitle: "Échec du téléversement ou de l'analyse",
    uploadDismiss: "Fermer",
    noThumbnailNotice: "Pas de miniature sous la main ?",
    trySamplesLink: "Essayez nos 3 échantillons de démonstration →",

    demoBadge: "Démos Interactives",
    demoHeading: "Essayez des Miniatures Synthétiques",
    demoSubheading: "Choisissez parmi nos 3 miniatures de test. Chacune sollicite des signaux visuels différents.",
    demoFaceTitle: "Sujet avec Visage",
    demoFaceSub: "Visage expressif avec texte à fort contraste",
    demoFaceBadge: "Visage Dominant",
    demoTextTitle: "Titre Textuel",
    demoTextSub: "Typographie imposante avec badges de liste",
    demoTextBadge: "Texte Dominant",
    demoProductTitle: "Produit / High-Tech",
    demoProductSub: "Mise en avant d'un produit avec éclairage studio",
    demoProductBadge: "Objet / Éclairage",
    demoActionAnalyze: "Analyser l'Échantillon →",

    diagTitle: "Diagnostics de l'Analyse :",
    diagAspect: "Dimensions :",
    btnAnalyzeAnother: "Analyser une Autre",
    btnExportReport: "Exporter le Rapport",
    modeOverlay: "Carte Thermique",
    modeOriginal: "Image Originale",
    modeSplit: "Côte à Côte",
    labelOpacity: "Opacité de la Carte :",
    labelIntensity: "Intensité de Fixation :",
    intensityHigh: "Élevée",
    intensityMed: "Moyenne",
    intensityLow: "Faible",
    originalUploadLabel: "Image Originale",
    predictedOverlayLabel: "Superposition d'Attention Prédite",

    scoreTitle: "Score d'Attention",
    scoreIndexLabel: "Indice Heuristique du Prototype",
    scoreMetricNote: "Modèle pondéré estimant la force de fixation du regard.",
    scorePrototypeDisclaimer: "Heuristiques d'ingénierie de prototype, données non issues d'oculométrie clinique.",
    signalBreakdown: "Détail des Signaux",
    signalWeights: "Poids du Moteur · Score",
    sigSaliency: "Saillance Visuelle",
    sigFace: "Visage / Émotion",
    sigText: "Lisibilité & Poids du Texte",
    sigContrast: "Contraste des Bords & Luminance",
    sigColor: "Saturation & Couleurs",
    sigComposition: "Composition & Cadrage",

    journeyTitle: "Parcours d'Attention Prédit",
    journeySubtitle: "Ordre Séquentiel de Fixation",
    journeyInteractiveNote: "Cliquez sur une étape pour la situer sur l'image",
    journeyInteractiveTag: "Interactif",

    whyTitle: "Pourquoi Ils Regardent Ici",
    whySubtitle: "Facteurs de psychologie visuelle",
    recsTitle: "Recommandations Concrètes",
    recsSubtitle: "Résolvez les conflits visuels et améliorez le parcours de lecture",
    btnAiExplain: "Explication IA Détaillée",
    btnAiConsulting: "Consultation de l'IA...",
    aiDiagnosisBadge: "Diagnostic d'Attention Visuelle IA",

    feedTitle: "Simulateur de Flux YouTube Réel",
    feedSubtitle: "Testez la lisibilité sur mobile et le masquage par la durée de vidéo",
    feedBadge168: "168px Mobile & Ordinateur",
    feedMobileLabel: "App Mobile YouTube (168px)",
    feedDesktopLabel: "Accueil YouTube Ordinateur (Compact)",
    feedProTip: "Astuce : Le coin inférieur droit est réservé à la durée de vidéo. Évitez d'y placer du texte ou un visage.",

    disclaimerBannerTitle: "Avertissement Scientifique :",
    disclaimerBannerBody: "Ce logiciel prédit l'attention visuelle par vision par ordinateur algorithmique. Il ne s'agit pas d'oculométrie physique et ne garantit pas de taux de clics (CTR) spécifiques."
  },

  de: {
    // German
    appName: "Thumbnail IQ",
    taglineShort: "Vorhergesagte Aufmerksamkeits-Heatmap",
    problemBadge: "PS 2 · KI/ML",
    tabAnalyze: "Analysieren",
    tabResults: "Ergebnisse",
    tabCreator: "KI-Creator",
    tabBattle: "Feed-Duell",
    tabCompare: "Vergleichen",
    tabDemo: "Demo",
    tabGuide: "Leitfaden",
    btnNewAnalysis: "Neue Analyse",
    selectLanguage: "Sprache",
    preloaderInit: "Neuronale Aufmerksamkeits-Engine wird initialisiert...",
    preloaderCalibrate: "Visuelle Salienz- und Heatmap-Knoten werden kalibriert...",
    preloaderReady: "Bereit zur Optimierung Ihrer Thumbnails!",
    disclaimerShort: "Vorhergesagte Aufmerksamkeit (kein Eye-Tracking)",
    apiReady: "API Bereit",
    apiOffline: "API Offline",
    apiChecking: "API wird geprüft...",

    heroPill: "Aufmerksamkeit verstehen. Thumbnail verbessern. Vor dem Veröffentlichen.",
    heroTitlePrefix: "Wohin blicken Zuschauer ",
    heroTitleGradient: "in den ersten 500 ms?",
    heroSubtitle: "KI-gestützte vorhergesagte visuelle Aufmerksamkeitsanalyse für YouTube-Thumbnails. Diagnose von Fixierungs-Hotspots und Optimierung der visuellen Hierarchie.",
    ctaAnalyze: "Thumbnail Analysieren",
    ctaDemos: "3 Demo-Beispiele Testen",

    featHeatmapTitle: "Aufmerksamkeits-Heatmap",
    featHeatmapSub: "Signalfusionskarte",
    featJourneyTitle: "Blickpfad-Reise",
    featJourneySub: "Scanpfad-Sequenz",
    featMobileTitle: "Mobile Vorschau",
    featMobileSub: "168px Feed-Karten-Check",
    featScoreTitle: "Design-Score",
    featScoreSub: "Prototyp-Score /100",

    uploadClickText: "Zum Hochladen klicken",
    uploadDragText: "oder Thumbnail hierher ziehen",
    uploadFormats: "PNG, JPG, JPEG oder WebP · Hohe Qualität (1280×720 empfohlen) · Max 10MB",
    uploadSelected: "Ausgewählt:",
    uploadBrowse: "Datei Auswählen",
    uploadAnalyzingTitle: "Aufmerksamkeits-Fusions-Pipeline läuft...",
    uploadAnalyzingSubtitle: "Berechnung visueller Salienz, Gesichter, Textkontraste und Blickpfadabfolge.",
    uploadStepValidating: "Validierung",
    uploadStepSaliency: "CV-Salienz",
    uploadStepHeatmap: "Heatmap",
    uploadErrorTitle: "Upload oder Analyse fehlgeschlagen",
    uploadDismiss: "Schließen",
    noThumbnailNotice: "Kein Thumbnail zur Hand?",
    trySamplesLink: "Testen Sie unsere 3 Demo-Beispiele →",

    demoBadge: "Interaktive Demos",
    demoHeading: "Vorgefertigte Thumbnails testen",
    demoSubheading: "Wählen Sie eines unserer 3 Test-Thumbnails. Jedes prüft unterschiedliche CV-Signale.",
    demoFaceTitle: "Fokus auf Gesicht",
    demoFaceSub: "Ausdrucksstarkes Gesicht mit kontrastreichem Text",
    demoFaceBadge: "Gesichtsdominant",
    demoTextTitle: "Textfokussierte Headline",
    demoTextSub: "Große Typografie mit Checklisten-Badges",
    demoTextBadge: "Textdominant",
    demoProductTitle: "Produkt- / Hardware-Showcase",
    demoProductSub: "Zentrales Produkt mit gezielter Studiobeleuchtung",
    demoProductBadge: "Objekt / Beleuchtung",
    demoActionAnalyze: "Beispiel Analysieren →",

    diagTitle: "Analyse-Diagnose:",
    diagAspect: "Abmessungen:",
    btnAnalyzeAnother: "Weiteres Analysieren",
    btnExportReport: "Bericht Exportieren",
    modeOverlay: "Aufmerksamkeits-Heatmap",
    modeOriginal: "Originalbild",
    modeSplit: "Nebeneinander",
    labelOpacity: "Heatmap-Deckkraft:",
    labelIntensity: "Fixierungsintensität:",
    intensityHigh: "Hoch",
    intensityMed: "Mittel",
    intensityLow: "Niedrig",
    originalUploadLabel: "Original-Upload",
    predictedOverlayLabel: "Vorhergesagte Überlagerung",

    scoreTitle: "Aufmerksamkeits-Score",
    scoreIndexLabel: "Prototyp-Design-Index",
    scoreMetricNote: "Gewichtetes Modell zur Schätzung der Blickbindungsstärke.",
    scorePrototypeDisclaimer: "Prototyp-Heuristiken; keine klinischen Blickdaten.",
    signalBreakdown: "Signalaufschlüsselung",
    signalWeights: "Engine-Gewichtung · Score",
    sigSaliency: "Visuelle Salienz",
    sigFace: "Gesicht / Emotion",
    sigText: "Textlesbarkeit & Stärke",
    sigContrast: "Kanten- & Helligkeitskontrast",
    sigColor: "Farbsättigung & Lebendigkeit",
    sigComposition: "Komposition & Bildausschnitt",

    journeyTitle: "Vorhergesagter Blickpfad",
    journeySubtitle: "Sequenzielle Fixierungsreihenfolge",
    journeyInteractiveNote: "Klicken Sie auf einen Schritt, um den Bereich hervorzuheben",
    journeyInteractiveTag: "Interaktiv",

    whyTitle: "Warum Zuschauer hierher blicken",
    whySubtitle: "Visuell-psychologische Treiber",
    recsTitle: "Konkrete Empfehlungen",
    recsSubtitle: "Konkurrierende Elemente beheben und Blickführung optimieren",
    btnAiExplain: "Detaillierte KI-Erklärung",
    btnAiConsulting: "KI wird befragt...",
    aiDiagnosisBadge: "KI-Blickdiagnose",

    feedTitle: "Echter YouTube-Feed-Simulator",
    feedSubtitle: "Prüfen Sie Lesbarkeit auf kleinen Bildschirmen und Zeitstempel-Überdeckung",
    feedBadge168: "168px Mobil & Desktop",
    feedMobileLabel: "YouTube Mobil-App (168px)",
    feedDesktopLabel: "YouTube Desktop Startseite (Kompakt)",
    feedProTip: "Profi-Tipp: Die untere rechte Ecke ist für die Videodauer reserviert. Halten Sie diesen Bereich frei von Text und Gesichtern.",

    disclaimerBannerTitle: "Wissenschaftlicher Hinweis:",
    disclaimerBannerBody: "Diese Software berechnet vorhergesagte visuelle Aufmerksamkeit mithilfe von Computer-Vision-Heuristiken. Es handelt sich nicht um physisches Eye-Tracking und garantiert keine bestimmten Klickraten (CTR)."
  },

  ja: {
    // Japanese
    appName: "Thumbnail IQ",
    taglineShort: "予測視線ヒートマップ",
    problemBadge: "PS 2 · AI/ML",
    tabAnalyze: "分析する",
    tabResults: "結果",
    tabCreator: "AIクリエイター",
    tabBattle: "フィード対戦",
    tabCompare: "比較",
    tabDemo: "デモ",
    tabGuide: "ガイド",
    btnNewAnalysis: "新規分析",
    selectLanguage: "言語",
    preloaderInit: "視線予測エンジンを初期化中...",
    preloaderCalibrate: "視覚サリエンスノードを調整中...",
    preloaderReady: "サムネイル最適化の準備が完了しました！",
    disclaimerShort: "予測視線（アイトラッキング機器ではありません）",
    apiReady: "API 準備完了",
    apiOffline: "API オフライン",
    apiChecking: "API 確認中...",

    heroPill: "視線を理解する。サムネイルを磨く。公開する前に。",
    heroTitlePrefix: "視聴者は最初の500msで ",
    heroTitleGradient: "どこを見るか？",
    heroSubtitle: "YouTubeサムネイル向けAI予測視線分析ツール。注目ホットスポットを可視化し、視線移動順序（スキャンパス）を診断してクリック率を最大化します。",
    ctaAnalyze: "サムネイルを分析",
    ctaDemos: "3つのデモを試す",

    featHeatmapTitle: "注目ヒートマップ",
    featHeatmapSub: "複数シグナル融合マップ",
    featJourneyTitle: "視線移動ジャーニー",
    featJourneySub: "スキャンパス順序",
    featMobileTitle: "モバイル再現プレビュー",
    featMobileSub: "168pxカード表示確認",
    featScoreTitle: "デザインスコア",
    featScoreSub: "プロトタイプ指標 /100",

    uploadClickText: "クリックしてアップロード",
    uploadDragText: "またはサムネイルをドラッグ＆ドロップ",
    uploadFormats: "PNG, JPG, JPEG, WebP · 高解像度（1280×720推奨） · 最大10MB",
    uploadSelected: "選択中:",
    uploadBrowse: "ファイルを選択",
    uploadAnalyzingTitle: "アテンション融合パイプライン実行中...",
    uploadAnalyzingSubtitle: "視覚サリエンス、顔認識、テキストコントラスト、視線順序を計算しています。",
    uploadStepValidating: "検証中",
    uploadStepSaliency: "CVサリエンス",
    uploadStepHeatmap: "ヒートマップ",
    uploadErrorTitle: "アップロードまたは分析エラー",
    uploadDismiss: "閉じる",
    noThumbnailNotice: "手元に画像がありませんか？",
    trySamplesLink: "3つの合成デモサンプルを試す →",

    demoBadge: "インタラクティブデモ",
    demoHeading: "プリセットのテスト用サムネイル",
    demoSubheading: "特徴の異なる3つのテスト画像をお選びください。それぞれ異なるCVシグナル（顔、文字、製品）を刺激します。",
    demoFaceTitle: "人物・表情メイン",
    demoFaceSub: "リアクション顔と高コントラストの帯テキスト",
    demoFaceBadge: "顔認識が主",
    demoTextTitle: "テキスト・見出しメイン",
    demoTextSub: "極太タイポグラフィと箇条書きバッジ",
    demoTextBadge: "文字認識が主",
    demoProductTitle: "製品・ギア紹介",
    demoProductSub: "中央ステージのカメラとリムライト照明",
    demoProductBadge: "物体／コントラスト主",
    demoActionAnalyze: "サンプルを分析 →",

    diagTitle: "分析診断結果:",
    diagAspect: "サイズ:",
    btnAnalyzeAnother: "別の画像を分析",
    btnExportReport: "レポート出力",
    modeOverlay: "注目ヒートマップ",
    modeOriginal: "元の画像",
    modeSplit: "左右比較",
    labelOpacity: "ヒートマップ透明度:",
    labelIntensity: "注目強度:",
    intensityHigh: "高注目",
    intensityMed: "中注目",
    intensityLow: "低注目",
    originalUploadLabel: "アップロード画像",
    predictedOverlayLabel: "予測ヒートマップ重ね合わせ",

    scoreTitle: "アテンションスコア",
    scoreIndexLabel: "プロトタイプ・ヒューリスティック指標",
    scoreMetricNote: "視線誘導の強さを推定する複合重み付けモデル。",
    scorePrototypeDisclaimer: "重み付けは初期プロトタイプの計算モデルであり、臨床的な視線計測データではありません。",
    signalBreakdown: "シグナル内訳",
    signalWeights: "重み · スコア",
    sigSaliency: "視覚サリエンス（目立ち度）",
    sigFace: "顔・表情の引力",
    sigText: "文字の可読性・太さ",
    sigContrast: "輪郭・輝度コントラスト",
    sigColor: "色彩・彩度アピール",
    sigComposition: "構図・中央バイアス",

    journeyTitle: "予測視線ジャーニー（順序）",
    journeySubtitle: "予測される視線のスキャン順序",
    journeyInteractiveNote: "ステップをクリックすると該当領域が強調されます",
    journeyInteractiveTag: "対話型",

    whyTitle: "なぜここに視線が集まるのか",
    whySubtitle: "視覚心理学に基づく誘引要因",
    recsTitle: "具体的な改善提案",
    recsSubtitle: "視線の衝突を解消し、スキャンパスを最適化",
    btnAiExplain: "AIによる詳細解説",
    btnAiConsulting: "AIに問い合わせ中...",
    aiDiagnosisBadge: "AI視線診断",

    feedTitle: "実際のYouTubeフィード再現",
    feedSubtitle: "スマホ小型画面での可読性と動画時間バッジの重なりを確認",
    feedBadge168: "168px モバイル＆デスクトップ",
    feedMobileLabel: "YouTubeスマホアプリ表示 (168px)",
    feedDesktopLabel: "YouTubeパソコン版ホーム (コンパクト)",
    feedProTip: "プロのコツ: 右下はYouTubeの動画再生時間バッジが表示されます。文字や顔を置かないようご注意ください。",

    disclaimerBannerTitle: "科学的注意事項:",
    disclaimerBannerBody: "本ツールはコンピュータビジョンによる「予測された視線注目」を算出します。赤外線カメラ等を用いた実機アイトラッキングではなく、CTRや視聴回数を保証するものではありません。"
  }
};

/**
 * Universal phrase translation dictionary for whole-page live translation.
 * Maps exact English sentences and phrases across all components to their localized versions.
 */
export const UNIVERSAL_PHRASES: Record<string, Record<Language, string>> = {
  // Navigation & Headers
  "Thumbnail IQ": { en: "Thumbnail IQ", es: "Thumbnail IQ", hi: "थंबनेल IQ", fr: "Thumbnail IQ", de: "Thumbnail IQ", ja: "Thumbnail IQ" },
  "Predicted Attention Heatmap": { en: "Predicted Attention Heatmap", es: "Mapa de Calor de Atención Predicha", hi: "अनुमानित ध्यान हीटमैप", fr: "Carte Thermique d'Attention Prédite", de: "Vorhergesagte Aufmerksamkeits-Heatmap", ja: "予測視線ヒートマップ" },
  "Analyze": { en: "Analyze", es: "Analizar", hi: "विश्लेषण", fr: "Analyser", de: "Analysieren", ja: "分析" },
  "Results": { en: "Results", es: "Resultados", hi: "परिणाम", fr: "Résultats", de: "Ergebnisse", ja: "結果" },
  "AI Creator": { en: "AI Creator", es: "Creador IA", hi: "AI क्रिएटर", fr: "Créateur IA", de: "KI-Creator", ja: "AIクリエイター" },
  "Feed Battle": { en: "Feed Battle", es: "Batalla de Feed", hi: "फ़ीड बैटल", fr: "Bataille de Flux", de: "Feed-Duell", ja: "フィード対戦" },
  "Compare": { en: "Compare", es: "Comparar", hi: "तुलना करें", fr: "Comparer", de: "Vergleichen", ja: "比較" },
  "Demo": { en: "Demo", es: "Demostración", hi: "डेमो", fr: "Démo", de: "Demo", ja: "デモ" },
  "Guide": { en: "Guide", es: "Guía", hi: "गाइड", fr: "Guide", de: "Leitfaden", ja: "ガイド" },
  "New Analysis": { en: "New Analysis", es: "Nuevo Análisis", hi: "नया विश्लेषण", fr: "Nouvelle Analyse", de: "Neue Analyse", ja: "新規分析" },
  "Select Language": { en: "Select Language", es: "Seleccionar Idioma", hi: "भाषा चुनें", fr: "Sélectionner la langue", de: "Sprache wählen", ja: "言語を選択" },
  "Language": { en: "Language", es: "Idioma", hi: "भाषा", fr: "Langue", de: "Sprache", ja: "言語" },
  "Switch to Light Mode": { en: "Switch to Light Mode", es: "Cambiar a modo claro", hi: "लाइट मोड पर स्विच करें", fr: "Passer en mode clair", de: "Zum hellen Modus wechseln", ja: "ライトモードに切り替え" },
  "Switch to Dark Mode": { en: "Switch to Dark Mode", es: "Cambiar a modo oscuro", hi: "डार्क मोड पर स्विच करें", fr: "Passer en mode sombre", de: "Zum dunklen Modus wechseln", ja: "ダークモードに切り替え" },
  "Language selector": { en: "Language selector", es: "Selector de idioma", hi: "भाषा चयनकर्ता", fr: "Sélecteur de langue", de: "Sprachauswahl", ja: "言語セレクター" },
  "Toggle Theme": { en: "Toggle Theme", es: "Alternar Tema", hi: "थीम बदलें", fr: "Changer de Thème", de: "Design Umschalten", ja: "テーマ切り替え" },

  // Hero Section
  "Where will viewers look in the first 500ms?": {
    en: "Where will viewers look in the first 500ms?",
    es: "¿Dónde mirarán los espectadores en los primeros 500ms?",
    hi: "दर्शक पहले 500 मिलीसेकंड में कहाँ देखेंगे?",
    fr: "Où regarderont les spectateurs dans les 500 premières ms ?",
    de: "Wohin blicken Zuschauer in den ersten 500 ms?",
    ja: "視聴者は最初の500msでどこを見るか？"
  },
  "Where will viewers look ": {
    en: "Where will viewers look ",
    es: "¿Dónde mirarán los espectadores ",
    hi: "दर्शक पहले 500 मिलीसेकंड में ",
    fr: "Où regarderont les spectateurs ",
    de: "Wohin blicken Zuschauer ",
    ja: "視聴者は最初の500msで "
  },
  "in the first 500ms?": {
    en: "in the first 500ms?",
    es: "en los primeros 500ms?",
    hi: "कहाँ देखेंगे?",
    fr: "dans les 500 premières ms ?",
    de: "in den ersten 500 ms?",
    ja: "どこを見るか？"
  },
  "Understand attention. Improve the thumbnail. Before you publish.": {
    en: "Understand attention. Improve the thumbnail. Before you publish.",
    es: "Comprende la atención. Mejora la miniatura. Antes de publicar.",
    hi: "ध्यान समझें। थंबनेल सुधारें। प्रकाशित करने से पहले।",
    fr: "Comprenez l'attention. Améliorez la miniature. Avant de publier.",
    de: "Aufmerksamkeit verstehen. Thumbnail verbessern. Vor dem Veröffentlichen.",
    ja: "視線を理解する。サムネイルを磨く。公開する前に。"
  },
  "AI-powered predicted visual attention analysis for YouTube thumbnails. Diagnose fixation hotspots, trace viewer scan journeys, and optimize your visual hierarchy before you post.": {
    en: "AI-powered predicted visual attention analysis for YouTube thumbnails. Diagnose fixation hotspots, trace viewer scan journeys, and optimize your visual hierarchy before you post.",
    es: "Análisis de atención visual predicha mediante IA para miniaturas de YouTube. Diagnostica zonas de fijación, analiza trayectorias visuales y optimiza la jerarquía visual antes de publicar.",
    hi: "YouTube थंबनेल के लिए AI-संचालित अनुमानित दृश्य ध्यान विश्लेषण। प्रकाशित करने से पहले फिक्सेशन हॉटस्पॉट और व्यूअर स्कैन पाथ का विश्लेषण करें।",
    fr: "Analyse prédictive de l'attention visuelle par IA pour miniatures YouTube. Diagnostiquez les zones de fixation et optimisez votre hiérarchie visuelle.",
    de: "KI-gestützte vorhergesagte visuelle Aufmerksamkeitsanalyse für YouTube-Thumbnails. Diagnose von Fixierungs-Hotspots und Optimierung der visuellen Hierarchie.",
    ja: "YouTubeサムネイル向けAI予測視線分析ツール。注目ホットスポットを可視化し、視線移動順序（スキャンパス）を診断してクリック率を最大化します。"
  },
  "Analyze Thumbnail": { en: "Analyze Thumbnail", es: "Analizar Miniatura", hi: "थंबनेल का विश्लेषण करें", fr: "Analyser la Miniature", de: "Thumbnail Analysieren", ja: "サムネイルを分析" },
  "Try 3 Demo Samples": { en: "Try 3 Demo Samples", es: "Probar 3 Muestras Demo", hi: "3 डेमो नमूने आज़माएं", fr: "Essayer 3 Démos", de: "3 Demo-Beispiele Testen", ja: "3つのデモを試す" },
  "Try Demo Samples": { en: "Try Demo Samples", es: "Probar Muestras Demo", hi: "डेमो नमूने आज़माएं", fr: "Essayer des Démos", de: "Demo-Beispiele Testen", ja: "デモを試す" },
  "View Results": { en: "View Results", es: "Ver Resultados", hi: "परिणाम देखें", fr: "Voir les Résultats", de: "Ergebnisse Anzeigen", ja: "結果を見る" },

  // Upload Box & Dropzone
  "Click to upload or drag & drop": { en: "Click to upload or drag & drop", es: "Haz clic para subir o arrastra y suelta", hi: "अपलोड करने के लिए क्लिक करें या ड्रैग और ड्रॉप करें", fr: "Cliquez pour téléverser ou glissez-déposez", de: "Klicken zum Hochladen oder per Drag & Drop", ja: "クリックしてアップロード、またはドラッグ＆ドロップ" },
  "Click to upload": { en: "Click to upload", es: "Haz clic para subir", hi: "अपलोड करने के लिए क्लिक करें", fr: "Cliquez pour téléverser", de: "Zum Hochladen klicken", ja: "クリックしてアップロード" },
  "or drag and drop your thumbnail": { en: "or drag and drop your thumbnail", es: "o arrastra y suelta tu miniatura", hi: "या थंबनेल को यहाँ ड्रैग और ड्रॉप करें", fr: "ou glissez-déposez votre miniature", de: "oder Thumbnail hierher ziehen", ja: "またはサムネイルをドラッグ＆ドロップ" },
  "Browse File": { en: "Browse File", es: "Explorar Archivos", hi: "फ़ाइल चुनें", fr: "Parcourir", de: "Datei Auswählen", ja: "ファイルを選択" },
  "Selected:": { en: "Selected:", es: "Seleccionado:", hi: "चयनित:", fr: "Sélectionné :", de: "Ausgewählt:", ja: "選択中:" },
  "Or paste YouTube URL": { en: "Or paste YouTube URL", es: "O pega una URL de YouTube", hi: "या YouTube URL पेस्ट करें", fr: "Ou collez une URL YouTube", de: "Oder YouTube-URL einfügen", ja: "またはYouTubeのURLを貼り付け" },
  "Paste YouTube Video URL...": { en: "Paste YouTube Video URL...", es: "Pega la URL del video de YouTube...", hi: "YouTube वीडियो URL यहाँ पेस्ट करें...", fr: "Coller l'URL de la vidéo YouTube...", de: "YouTube-Video-URL einfügen...", ja: "YouTube動画のURLを貼り付け..." },
  "Analyze Video": { en: "Analyze Video", es: "Analizar Video", hi: "वीडियो का विश्लेषण करें", fr: "Analyser la Vidéo", de: "Video Analysieren", ja: "動画を分析" },
  "Analyzing...": { en: "Analyzing...", es: "Analizando...", hi: "विश्लेषण हो रहा है...", fr: "Analyse en cours...", de: "Wird analysiert...", ja: "分析中..." },
  "Running Attention Fusion Pipeline...": { en: "Running Attention Fusion Pipeline...", es: "Ejecutando Pipeline de Fusión de Atención...", hi: "अटेंशन फ्यूजन पाइपलाइन चल रही है...", fr: "Exécution du pipeline de fusion...", de: "Aufmerksamkeits-Fusions-Pipeline läuft...", ja: "アテンション融合パイプライン実行中..." },
  "Computing visual saliency, face fixations, text contrast, and scanpath sequence.": { en: "Computing visual saliency, face fixations, text contrast, and scanpath sequence.", es: "Calculando prominencia visual, caras, contraste de texto y trayectoria de escaneo.", hi: "विज़ुअल सेलियेंसी, चेहरे, टेक्स्ट कंट्रास्ट और स्कैनपाथ क्रम की गणना हो रही है।", fr: "Calcul de la saillance visuelle, visages, contraste du texte et trajectoire.", de: "Berechnung visueller Salienz, Gesichter, Textkontraste und Blickpfadabfolge.", ja: "視覚サリエンス、顔認識、テキストコントラスト、視線順序を計算しています。" },
  "Validating": { en: "Validating", es: "Validando", hi: "सत्यापन", fr: "Validation", de: "Validierung", ja: "検証中" },
  "CV Saliency": { en: "CV Saliency", es: "Prominencia CV", hi: "CV सेलियेंसी", fr: "Saillance CV", de: "CV-Salienz", ja: "CVサリエンス" },
  "Heatmap": { en: "Heatmap", es: "Mapa de Calor", hi: "हीटमैप", fr: "Carte thermique", de: "Heatmap", ja: "ヒートマップ" },
  "Upload or Analysis Failed": { en: "Upload or Analysis Failed", es: "Fallo en la Carga o Análisis", hi: "अपलोड या विश्लेषण विफल रहा", fr: "Échec du téléversement ou de l'analyse", de: "Upload oder Analyse fehlgeschlagen", ja: "アップロードまたは分析エラー" },
  "Dismiss": { en: "Dismiss", es: "Descartar", hi: "खारिज करें", fr: "Fermer", de: "Schließen", ja: "閉じる" },
  "Don't have a thumbnail ready?": { en: "Don't have a thumbnail ready?", es: "¿No tienes una miniatura lista?", hi: "क्या आपके पास थंबनेल तैयार नहीं है?", fr: "Pas de miniature sous la main ?", de: "Kein Thumbnail zur Hand?", ja: "手元に画像がありませんか？" },
  "Try our 3 synthetic demo samples →": { en: "Try our 3 synthetic demo samples →", es: "Prueba nuestras 3 muestras sintéticas →", hi: "हमारे 3 डेमो नमूने आज़माएं →", fr: "Essayez nos 3 échantillons de démonstration →", de: "Testen Sie unsere 3 Demo-Beispiele →", ja: "3つの合成デモサンプルを試す →" },

  // Demo Section
  "COMPARATIVE ATTENTION AUDITS": { en: "COMPARATIVE ATTENTION AUDITS", es: "AUDITORÍAS COMPARATIVAS DE ATENCIÓN", hi: "तुलनात्मक ध्यान ऑडिट", fr: "AUDITS COMPARATIFS D'ATTENTION", de: "VERGLEICHENDE AUFMERKSAMKEITSAUDITS", ja: "比較視線監査" },
  "Try Demo Thumbnails": { en: "Try Demo Thumbnails", es: "Probar Miniaturas Demo", hi: "डेमो थंबनेल आज़माएं", fr: "Essayer des Miniatures Démo", de: "Demo-Thumbnails Testen", ja: "デモサムネイルを試す" },
  "Real YouTube videos with live attention breakdown. Thumbnails are fetched directly from YouTube CDN.": {
    en: "Real YouTube videos with live attention breakdown. Thumbnails are fetched directly from YouTube CDN.",
    es: "Videos reales de YouTube con desglose de atención en vivo. Las miniaturas se obtienen directamente de la CDN de YouTube.",
    hi: "वास्तविक YouTube वीडियो ध्यान विश्लेषण के साथ। थंबनेल सीधे YouTube CDN से लोड होते हैं।",
    fr: "Vidéos YouTube réelles avec analyse de l'attention en direct. Miniatures récupérées directement depuis le CDN YouTube.",
    de: "Echte YouTube-Videos mit Live-Aufschlüsselung der Aufmerksamkeit. Thumbnails direkt vom YouTube-CDN.",
    ja: "実際のYouTube動画とリアルタイム注目分析。サムネイルはYouTube CDNから直接取得されます。"
  },
  "Live YouTube CDN thumbnails": { en: "Live YouTube CDN thumbnails", es: "Miniaturas en vivo de CDN de YouTube", hi: "लाइव YouTube CDN थंबनेल", fr: "Miniatures en direct du CDN YouTube", de: "Live-Thumbnails von YouTube-CDN", ja: "ライブYouTube CDNサムネイル" },
  "FACE-HEAVY": { en: "FACE-HEAVY", es: "ROSTRO DOMINANTE", hi: "चेहरा प्रमुख", fr: "VISAGE DOMINANT", de: "GESICHTSDOMINANT", ja: "顔認識重視" },
  "TEXT-HEAVY": { en: "TEXT-HEAVY", es: "TEXTO DOMINANTE", hi: "टेक्स्ट प्रमुख", fr: "TEXTE DOMINANT", de: "TEXTDOMINANT", ja: "文字認識重視" },
  "PRODUCT / TECH": { en: "PRODUCT / TECH", es: "PRODUCTO / TECNOLOGÍA", hi: "उत्पाद / टेक", fr: "PRODUIT / HIGH-TECH", de: "PRODUKT / TECH", ja: "製品・テクノロジー" },
  "Face Hotspot: 94%": { en: "Face Hotspot: 94%", es: "Punto de Rostro: 94%", hi: "चेहरा हॉटस्पॉट: 94%", fr: "Zone Visage : 94%", de: "Gesichts-Hotspot: 94%", ja: "顔ホットスポット: 94%" },
  "Headline Pop: 91%": { en: "Headline Pop: 91%", es: "Impacto del Titular: 91%", hi: "हेडलाइन आकर्षण: 91%", fr: "Impact Titre : 91%", de: "Headline-Auffälligkeit: 91%", ja: "見出しインパクト: 91%" },
  "Object Contrast: 87%": { en: "Object Contrast: 87%", es: "Contraste de Objeto: 87%", hi: "ऑब्जेक्ट कंट्रास्ट: 87%", fr: "Contraste Objet : 87%", de: "Objekt-Kontrast: 87%", ja: "物体コントラスト: 87%" },
  "Fixation speed": { en: "Fixation speed", es: "Velocidad de fijación", hi: "फिक्सेशन गति", fr: "Vitesse de fixation", de: "Fixierungsgeschwindigkeit", ja: "視線誘導速度" },
  "Scan Path": { en: "Scan Path", es: "Ruta de escaneo", hi: "स्कैन पाथ", fr: "Trajectoire de balayage", de: "Scanpfad", ja: "スキャンパス" },
  "Estimated CTR Lift": { en: "Estimated CTR Lift", es: "Aumento estimado de CTR", hi: "अनुमानित CTR वृद्धि", fr: "Hausse de CTR estimée", de: "Geschätzter CTR-Zuwachs", ja: "推定CTR向上" },
  "Inspect & Analyze →": { en: "Inspect & Analyze →", es: "Inspeccionar y Analizar →", hi: "जांचें और विश्लेषण करें →", fr: "Inspecter & Analyser →", de: "Prüfen & Analysieren →", ja: "詳細確認＆分析 →" },
  "Analyzing…": { en: "Analyzing…", es: "Analizando…", hi: "विश्लेषण हो रहा है…", fr: "Analyse en cours…", de: "Wird analysiert…", ja: "分析中…" },

  // Analysis Dashboard
  "Analyses": { en: "Analyses", es: "Análisis", hi: "विश्लेषण", fr: "Analyses", de: "Analysen", ja: "分析履歴" },
  "Analysis Results": { en: "Analysis Results", es: "Resultados del Análisis", hi: "विश्लेषण परिणाम", fr: "Résultats de l'Analyse", de: "Analyse-Ergebnisse", ja: "分析結果" },
  "Export Summary": { en: "Export Summary", es: "Exportar Resumen", hi: "सारांश निर्यात करें", fr: "Exporter le Résumé", de: "Zusammenfassung Exportieren", ja: "サマリー出力" },
  "Export Report": { en: "Export Report", es: "Exportar Reporte", hi: "रिपोर्ट निर्यात करें", fr: "Exporter le Rapport", de: "Bericht Exportieren", ja: "レポート出力" },
  "View on YouTube": { en: "View on YouTube", es: "Ver en YouTube", hi: "YouTube पर देखें", fr: "Voir sur YouTube", de: "Auf YouTube Ansehen", ja: "YouTubeで見る" },
  "Original Thumbnail": { en: "Original Thumbnail", es: "Miniatura Original", hi: "मूल थंबनेल", fr: "Miniature Originale", de: "Original-Thumbnail", ja: "元のサムネイル" },
  "Attention Heatmap": { en: "Attention Heatmap", es: "Mapa de Calor de Atención", hi: "अटेंशन हीटमैप", fr: "Carte d'Attention", de: "Aufmerksamkeits-Heatmap", ja: "注目ヒートマップ" },
  "Original Image": { en: "Original Image", es: "Imagen Original", hi: "मूल छवि", fr: "Image Originale", de: "Originalbild", ja: "元の画像" },
  "Side-by-Side": { en: "Side-by-Side", es: "Lado a Lado", hi: "आमने-सामने तुलना", fr: "Côte à Côte", de: "Nebeneinander", ja: "左右比較" },
  "Overlay": { en: "Overlay", es: "Superposición", hi: "ओवरले", fr: "Superposition", de: "Überlagerung", ja: "重ね合わせ" },
  "Thermal Fusion": { en: "Thermal Fusion", es: "Fusión Térmica", hi: "थर्मल फ्यूजन", fr: "Fusion Thermique", de: "Thermische Fusion", ja: "サーマル融合" },
  "Spectral Saliency": { en: "Spectral Saliency", es: "Prominencia Espectral", hi: "स्पेक्ट्रल सेलियेंसी", fr: "Saillance Spectrale", de: "Spektrale Salienz", ja: "スペクトルサリエンス" },
  "Contour Map": { en: "Contour Map", es: "Mapa de Contorno", hi: "कंटूर मैप", fr: "Carte de Contours", de: "Konturkarte", ja: "等高線マップ" },
  "Fixation Gaze": { en: "Fixation Gaze", es: "Mirada de Fijación", hi: "फिक्सेशन गेज़", fr: "Regard de Fixation", de: "Blickfixierung", ja: "視線注視マップ" },
  "Squint Mode (Blur Test)": { en: "Squint Mode (Blur Test)", es: "Modo Entrecerrar Ojos (Desenfoque)", hi: "स्क्विंट मोड (धुंधला टेस्ट)", fr: "Mode Regard Plissé (Flou)", de: "Blinzel-Modus (Unschärfetest)", ja: "目を細めるモード（ぼかし確認）" },
  "Squint Mode": { en: "Squint Mode", es: "Modo Entrecerrar", hi: "स्क्विंट मोड", fr: "Mode Flou", de: "Blinzel-Modus", ja: "目を細める" },
  "Heatmap Opacity:": { en: "Heatmap Opacity:", es: "Opacidad del Mapa:", hi: "हीटमैप पारदर्शिता:", fr: "Opacité de la Carte :", de: "Heatmap-Deckkraft:", ja: "ヒートマップ透明度:" },
  "Fixation Intensity:": { en: "Fixation Intensity:", es: "Intensidad de Fijación:", hi: "फिक्सेशन तीव्रता:", fr: "Intensité de Fixation :", de: "Fixierungsintensität:", ja: "注目強度:" },
  "High": { en: "High", es: "Alta", hi: "उच्च", fr: "Élevée", de: "Hoch", ja: "高" },
  "Med": { en: "Med", es: "Media", hi: "मध्यम", fr: "Moyenne", de: "Mittel", ja: "中" },
  "Low": { en: "Low", es: "Baja", hi: "कम", fr: "Faible", de: "Niedrig", ja: "低" },
  "Optimal Hierarchy": { en: "Optimal Hierarchy", es: "Jerarquía Óptima", hi: "इष्टतम पदानुक्रम", fr: "Hiérarchie Optimale", de: "Optimale Hierarchie", ja: "最適な視線階層" },
  "Balanced Attention": { en: "Balanced Attention", es: "Atención Equilibrada", hi: "संतुलित ध्यान", fr: "Attention Équilibrée", de: "Ausgewogene Aufmerksamkeit", ja: "バランスの取れた注目" },
  "Competing Signals": { en: "Competing Signals", es: "Señales en Conflicto", hi: "प्रतिस्पर्धी सिग्नल", fr: "Signaux en Conflit", de: "Konkurrierende Signale", ja: "視線が衝突・分散" },
  "Attention Score": { en: "Attention Score", es: "Puntuación de Atención", hi: "अटेंशन स्कोर", fr: "Score d'Attention", de: "Aufmerksamkeits-Score", ja: "アテンションスコア" },
  "Prototype Heuristic Design Index": { en: "Prototype Heuristic Design Index", es: "Índice de Diseño Heurístico de Prototipo", hi: "प्रोटोटाइप डिज़ाइन सूचकांक", fr: "Indice Heuristique du Prototype", de: "Prototyp-Design-Index", ja: "プロトタイプ指標" },
  "Signal Breakdown": { en: "Signal Breakdown", es: "Desglose de Señales", hi: "सिग्नल विश्लेषण", fr: "Détail des Signaux", de: "Signalaufschlüsselung", ja: "シグナル内訳" },
  "Engine Weight · Score": { en: "Engine Weight · Score", es: "Peso del Motor · Puntuación", hi: "इंजन वेटेज · स्कोर", fr: "Poids du Moteur · Score", de: "Engine-Gewichtung · Score", ja: "重み · スコア" },
  "Visual Saliency": { en: "Visual Saliency", es: "Prominencia Visual", hi: "विज़ुअल सेलियेंसी", fr: "Saillance Visuelle", de: "Visuelle Salienz", ja: "視覚サリエンス" },
  "Face / Emotion Saliency": { en: "Face / Emotion Saliency", es: "Rostro / Emoción", hi: "चेहरा / भाव आकर्षण", fr: "Visage / Émotion", de: "Gesicht / Emotion", ja: "顔・表情の引力" },
  "Text Legibility & Weight": { en: "Text Legibility & Weight", es: "Legibilidad y Peso del Texto", hi: "टेक्स्ट पठनीयता व वज़न", fr: "Lisibilité & Poids du Texte", de: "Textlesbarkeit & Stärke", ja: "文字の可読性・太さ" },
  "Edge & Luminance Contrast": { en: "Edge & Luminance Contrast", es: "Contraste de Bordes y Luminancia", hi: "कंट्रास्ट व किनारे", fr: "Contraste des Bords & Luminance", de: "Kanten- & Helligkeitskontrast", ja: "輪郭・輝度コントラスト" },
  "Color Saturation & Vibrancy": { en: "Color Saturation & Vibrancy", es: "Saturación y Color", hi: "रंग व संतृप्ति (Saturation)", fr: "Saturation & Couleurs", de: "Farbsättigung & Lebendigkeit", ja: "色彩・彩度アピール" },
  "Composition & Framing": { en: "Composition & Framing", es: "Composición y Encuadre", hi: "संरचना व फ़्रेमिंग", fr: "Composition & Cadrage", de: "Komposition & Bildausschnitt", ja: "構図・中央バイアス" },

  // Journey
  "Predicted Attention Journey": { en: "Predicted Attention Journey", es: "Trayectoria de Atención Predicha", hi: "अनुमानित ध्यान यात्रा", fr: "Parcours d'Attention Prédit", de: "Vorhergesagter Blickpfad", ja: "予測視線ジャーニー" },
  "Predicted Sequential Fixation Order": { en: "Predicted Sequential Fixation Order", es: "Orden Secuencial de Fijación Predicho", hi: "अनुमानित फिक्सेशन क्रम", fr: "Ordre Séquentiel de Fixation", de: "Sequenzielle Fixierungsreihenfolge", ja: "予測される視線のスキャン順序" },
  "Click any step to highlight position on image": { en: "Click any step to highlight position on image", es: "Haz clic en cualquier paso para resaltar la posición", hi: "छवि पर स्थिति हाइलाइट करने के लिए किसी भी चरण पर क्लिक करें", fr: "Cliquez sur une étape pour la situer sur l'image", de: "Klicken Sie auf einen Schritt, um den Bereich hervorzuheben", ja: "ステップをクリックすると該当領域が強調されます" },
  "Interactive": { en: "Interactive", es: "Interactivo", hi: "इंटरएक्टिव", fr: "Interactif", de: "Interaktiv", ja: "対話型" },

  // Competition & Hierarchy Card
  "Attention Competition & Hierarchy": { en: "Attention Competition & Hierarchy", es: "Competencia y Jerarquía de Atención", hi: "ध्यान प्रतिस्पर्धा और पदानुक्रम", fr: "Concurrence et Hiérarchie de l'Attention", de: "Aufmerksamkeitswettbewerb & Hierarchie", ja: "視線の競合と階層構造" },
  "Primary vs secondary attractors & visual distractors": { en: "Primary vs secondary attractors & visual distractors", es: "Atracciones principales vs secundarias y distractores visuales", hi: "प्राथमिक बनाम द्वितीयक आकर्षण और दृश्य विकर्षण", fr: "Attracteurs principaux vs secondaires et distracteurs visuels", de: "Haupt- vs. Nebenattraktoren & visuelle Ablenkungen", ja: "主要アトラクター vs 補助要素＆視線ノイズ" },
  "Signal Weighting": { en: "Signal Weighting", es: "Ponderación de Señales", hi: "सिग्नल वेटेज", fr: "Pondération des Signaux", de: "Signalgewichtung", ja: "シグナル重み付け" },
  "Main Subject": { en: "Main Subject", es: "Sujeto Principal", hi: "मुख्य विषय", fr: "Sujet Principal", de: "Hauptmotiv", ja: "メイン被写体" },
  "Headline Text": { en: "Headline Text", es: "Texto del Titular", hi: "शीर्षक टेक्स्ट", fr: "Texte du Titre", de: "Überschriftstext", ja: "見出しテキスト" },
  "Background Texture & Peripheral Elements": { en: "Background Texture & Peripheral Elements", es: "Textura de fondo y elementos periféricos", hi: "पृष्ठभूमि बनावट और परिधीय तत्व", fr: "Texture d'arrière-plan et éléments périphériques", de: "Hintergrundstruktur & periphere Elemente", ja: "背景テクスチャと周辺要素" },
  "High-Saturation Edge Gradients": { en: "High-Saturation Edge Gradients", es: "Gradientes de borde de alta saturación", hi: "अत्यधिक संतृप्त किनारे", fr: "Dégradés de bordure très saturés", de: "Hochgesättigte Randverläufe", ja: "彩度の高すぎる輪郭グラデーション" },
  "Lower-Third Detail Clutter": { en: "Lower-Third Detail Clutter", es: "Desorden de detalles en el tercio inferior", hi: "निचले हिस्से में विवरणों का बिखराव", fr: "Encombrement dans le tiers inférieur", de: "Detailüberladung im unteren Drittel", ja: "下部3分の1の余分な視覚ノイズ" },

  // Why & Recommendations
  "Why Viewers Look Here": { en: "Why Viewers Look Here", es: "Por Qué Miran Aquí", hi: "दर्शक यहाँ क्यों देखते हैं", fr: "Pourquoi Ils Regardent Ici", de: "Warum Zuschauer hierher blicken", ja: "なぜここに視線が集まるのか" },
  "Heuristic visual psychology drivers": { en: "Heuristic visual psychology drivers", es: "Impulsores de psicología visual heurística", hi: "दृश्य मनोविज्ञान के प्रेरक कारक", fr: "Facteurs de psychologie visuelle", de: "Visuell-psychologische Treiber", ja: "視覚心理学に基づく誘引要因" },
  "Actionable Recommendations": { en: "Actionable Recommendations", es: "Recomendaciones Accionables", hi: "व्यावहारिक सुधार सुझाव", fr: "Recommandations Concrètes", de: "Konkrete Empfehlungen", ja: "具体的な改善提案" },
  "Fix competing elements & enhance scan path": { en: "Fix competing elements & enhance scan path", es: "Corrige elementos en competencia y mejora el escaneo", hi: "प्रतिस्पर्धी तत्वों को ठीक करें और स्कैन पाथ सुधारें", fr: "Résolvez les conflits visuels et améliorez le parcours de lecture", de: "Konkurrierende Elemente beheben und Blickführung optimieren", ja: "視線の衝突を解消し、スキャンパスを最適化" },
  "Deep-Dive AI Explanation": { en: "Deep-Dive AI Explanation", es: "Explicación Detallada de IA", hi: "विस्तृत AI स्पष्टीकरण", fr: "Explication IA Détaillée", de: "Detaillierte KI-Erklärung", ja: "AIによる詳細解説" },
  "Consulting AI...": { en: "Consulting AI...", es: "Consultando a la IA...", hi: "AI से परामर्श किया जा रहा है...", fr: "Consultation de l'IA...", de: "KI wird befragt...", ja: "AIに問い合わせ中..." },
  "AI Visual Attention Diagnosis": { en: "AI Visual Attention Diagnosis", es: "Diagnóstico Visual de IA", hi: "AI दृश्य ध्यान निदान", fr: "Diagnostic d'Attention Visuelle IA", de: "KI-Blickdiagnose", ja: "AI視線診断" },

  // Feed Simulator
  "Real YouTube Feed Simulator": { en: "Real YouTube Feed Simulator", es: "Simulador Real de YouTube", hi: "वास्तविक YouTube फ़ीड सिम्युलेटर", fr: "Simulateur de Flux YouTube Réel", de: "Echter YouTube-Feed-Simulator", ja: "実際のYouTubeフィード再現" },
  "Test small-screen legibility & timestamp occlusion": { en: "Test small-screen legibility & timestamp occlusion", es: "Prueba legibilidad en pantallas pequeñas y oclusión de marca temporal", hi: "छोटी स्क्रीन पर स्पष्टता और टाइमस्टैम्प की रुकावट जांचें", fr: "Testez la lisibilité sur mobile et le masquage par la durée de vidéo", de: "Prüfen Sie Lesbarkeit auf kleinen Bildschirmen und Zeitstempel-Überdeckung", ja: "スマホ小型画面での可読性と動画時間バッジの重なりを確認" },
  "168px Mobile & Desktop": { en: "168px Mobile & Desktop", es: "168px Móvil y Escritorio", hi: "168px मोबाइल व डेस्कटॉप", fr: "168px Mobile & Ordinateur", de: "168px Mobil & Desktop", ja: "168px モバイル＆デスクトップ" },
  "Mobile YouTube App (168px)": { en: "Mobile YouTube App (168px)", es: "App Móvil de YouTube (168px)", hi: "YouTube मोबाइल ऐप (168px)", fr: "App Mobile YouTube (168px)", de: "YouTube Mobil-App (168px)", ja: "YouTubeスマホアプリ表示 (168px)" },
  "Desktop YouTube Home (Compact)": { en: "Desktop YouTube Home (Compact)", es: "YouTube de Escritorio (Compacto)", hi: "YouTube डेस्कटॉप होम (कॉम्पैक्ट)", fr: "Accueil YouTube Ordinateur (Compact)", de: "YouTube Desktop Startseite (Kompakt)", ja: "YouTubeパソコン版ホーム (コンパクト)" },

  // AI Creator Tab
  "AI Prompt to Thumbnail Generator & Canvas Studio": {
    en: "AI Prompt to Thumbnail Generator & Canvas Studio",
    es: "Generador de Miniaturas por IA y Estudio de Lienzo",
    hi: "AI प्रॉम्प्ट से थंबनेल जेनरेटर व कैनवास स्टूडियो",
    fr: "Générateur de Miniatures par IA & Studio de Création",
    de: "KI-Prompt-zu-Thumbnail-Generator & Canvas-Studio",
    ja: "AIプロンプト生成＆キャンバス作成スタジオ"
  },
  "Generate high-converting thumbnails with AI assistance, customize in canvas studio, and test attention in real time.": {
    en: "Generate high-converting thumbnails with AI assistance, customize in canvas studio, and test attention in real time.",
    es: "Genera miniaturas de alta conversión con asistencia de IA, personaliza en el estudio de lienzo y prueba la atención en tiempo real.",
    hi: "AI की मदद से आकर्षक थंबनेल बनाएं, कैनवास पर संपादित करें और तुरंत ध्यान का परीक्षण करें।",
    fr: "Générez des miniatures percutantes avec l'IA, personnalisez-les sur le canvas et testez l'attention en direct.",
    de: "Erstellen Sie konvertierungsstarke Thumbnails mit KI-Unterstützung, passen Sie sie im Canvas-Studio an und testen Sie die Aufmerksamkeit in Echtzeit.",
    ja: "AIでクリック率の高いサムネイルを生成し、キャンバス上で自由に編集してリアルタイムで視線をテストできます。"
  },
  "Describe your video topic or thumbnail concept...": {
    en: "Describe your video topic or thumbnail concept...",
    es: "Describe el tema de tu video o el concepto de la miniatura...",
    hi: "अपने वीडियो का विषय या थंबनेल का विचार यहाँ लिखें...",
    fr: "Décrivez le sujet de votre vidéo ou le concept de votre miniature...",
    de: "Beschreiben Sie Ihr Videothema oder Thumbnail-Konzept...",
    ja: "動画のテーマやサムネイルのコンセプトを入力してください..."
  },
  "Generate Thumbnail": { en: "Generate Thumbnail", es: "Generar Miniatura", hi: "थंबनेल बनाएं", fr: "Générer la Miniature", de: "Thumbnail Generieren", ja: "サムネイルを生成" },
  "Generating Thumbnail...": { en: "Generating Thumbnail...", es: "Generando Miniatura...", hi: "थंबनेल बनाया जा रहा है...", fr: "Génération en cours...", de: "Thumbnail wird generiert...", ja: "サムネイル生成中..." },
  "Canvas Studio": { en: "Canvas Studio", es: "Estudio de Lienzo", hi: "कैनवास स्टूडियो", fr: "Studio Canvas", de: "Canvas-Studio", ja: "キャンバススタジオ" },
  "Niche Presets": { en: "Niche Presets", es: "Preajustes por Nicho", hi: "श्रेणी प्रीसेट", fr: "Préréglages de Niche", de: "Nischen-Vorlagen", ja: "ジャンル別プリセット" },
  "Add Text": { en: "Add Text", es: "Añadir Texto", hi: "टेक्स्ट जोड़ें", fr: "Ajouter du Texte", de: "Text Hinzufügen", ja: "テキストを追加" },
  "Add Badge": { en: "Add Badge", es: "Añadir Insignia", hi: "बैज जोड़ें", fr: "Ajouter un Badge", de: "Badge Hinzufügen", ja: "バッジを追加" },
  "Add Sticker": { en: "Add Sticker", es: "Añadir Pegatina", hi: "स्टिकर जोड़ें", fr: "Ajouter un Autocollant", de: "Sticker Hinzufügen", ja: "ステッカーを追加" },
  "Background Color": { en: "Background Color", es: "Color de Fondo", hi: "पृष्ठभूमि का रंग", fr: "Couleur de Fond", de: "Hintergrundfarbe", ja: "背景色" },
  "Download PNG": { en: "Download PNG", es: "Descargar PNG", hi: "PNG डाउनलोड करें", fr: "Télécharger PNG", de: "PNG Herunterladen", ja: "PNGを保存" },
  "Analyze in Dashboard": { en: "Analyze in Dashboard", es: "Analizar en el Panel", hi: "डैशबोर्ड में विश्लेषण करें", fr: "Analyser dans le Tableau de Bord", de: "Im Dashboard Analysieren", ja: "ダッシュボードで分析" },

  // Feed Battle Arena Tab
  "YouTube Feed Battle Arena": { en: "YouTube Feed Battle Arena", es: "Arena de Batalla de Feed de YouTube", hi: "YouTube फ़ीड बैटल एरिना", fr: "Arène de Bataille de Flux YouTube", de: "YouTube-Feed-Battle-Arena", ja: "YouTubeフィード対戦アリーナ" },
  "Simulate how your thumbnail competes against high-performing viral videos in real YouTube feeds.": {
    en: "Simulate how your thumbnail competes against high-performing viral videos in real YouTube feeds.",
    es: "Simula cómo compite tu miniatura frente a videos virales de alto rendimiento en feeds reales de YouTube.",
    hi: "देखें कि आपका थंबनेल वास्तविक YouTube फ़ीड में शीर्ष वायरल वीडियो के सामने कैसा प्रदर्शन करता है।",
    fr: "Simulez la concurrence de votre miniature face à des vidéos virales à succès dans de vrais flux YouTube.",
    de: "Simulieren Sie, wie Ihr Thumbnail gegen erfolgreiche virale Videos in echten YouTube-Feeds antritt.",
    ja: "実際のYouTubeフィード上で、あなたのサムネイルが競合の人気動画とどのように勝負できるかをシミュレーションします。"
  },
  "Select Feed Niche": { en: "Select Feed Niche", es: "Seleccionar Nicho de Feed", hi: "फ़ीड श्रेणी चुनें", fr: "Choisir la Niche du Flux", de: "Feed-Nische Wählen", ja: "フィードジャンルを選択" },
  "Gaming Battle": { en: "Gaming Battle", es: "Batalla de Gaming", hi: "गेमिंग बैटल", fr: "Bataille Gaming", de: "Gaming-Duell", ja: "ゲーム対戦" },
  "Tech Battle": { en: "Tech Battle", es: "Batalla Tecnológica", hi: "टेक बैटल", fr: "Bataille Tech", de: "Tech-Duell", ja: "テクノロジー対戦" },
  "Finance Battle": { en: "Finance Battle", es: "Batalla Financiera", hi: "फाइनेंस बैटल", fr: "Bataille Finance", de: "Finanz-Duell", ja: "マネー・金融対戦" },
  "Education Battle": { en: "Education Battle", es: "Batalla Educativa", hi: "शिक्षा बैटल", fr: "Bataille Éducation", de: "Bildungs-Duell", ja: "教育・教養対戦" },
  "Simulate Feed Shuffle": { en: "Simulate Feed Shuffle", es: "Simular Mezcla de Feed", hi: "फ़ीड फेरबदल सिमुलेट करें", fr: "Simuler le Mélange du Flux", de: "Feed-Mischung Simulieren", ja: "フィード配置をシャッフル" },
  "Attention Share": { en: "Attention Share", es: "Cuota de Atención", hi: "अटेंशन शेयर", fr: "Part d'Attention", de: "Aufmerksamkeitsanteil", ja: "視線シェア率" },
  "Win Probability": { en: "Win Probability", es: "Probabilidad de Ganar", hi: "जीतने की संभावना", fr: "Probabilité de Victoire", de: "Gewinnwahrscheinlichkeit", ja: "勝利確率" },
  "CTR Estimate": { en: "CTR Estimate", es: "CTR Estimado", hi: "अनुमानित CTR", fr: "CTR Estimé", de: "Geschätzte CTR", ja: "推定CTR" },
  "Visual Dominance Index": { en: "Visual Dominance Index", es: "Índice de Dominio Visual", hi: "विज़ुअल प्रभुत्व सूचकांक", fr: "Indice de Dominance Visuelle", de: "Visueller Dominanzindex", ja: "視覚的支配力指数" },
  "Your Thumbnail": { en: "Your Thumbnail", es: "Tu Miniatura", hi: "आपका थंबनेल", fr: "Votre Miniature", de: "Ihr Thumbnail", ja: "あなたのサムネイル" },

  // Standalone Compare Tab
  "Thumbnail A/B Comparison": { en: "Thumbnail A/B Comparison", es: "Comparación A/B de Miniaturas", hi: "थंबनेल A/B तुलना", fr: "Comparaison A/B de Miniatures", de: "Thumbnail-A/B-Vergleich", ja: "サムネイル A/B 比較" },
  "Compare two thumbnails side by side to see which one commands viewer attention first.": {
    en: "Compare two thumbnails side by side to see which one commands viewer attention first.",
    es: "Compara dos miniaturas lado a lado para ver cuál capta primero la atención del espectador.",
    hi: "दो थंबनेल्स की एक साथ तुलना करें और देखें कि कौन सा थंबनेल दर्शकों का ध्यान पहले खींचता है।",
    fr: "Comparez deux miniatures côte à côte pour découvrir laquelle attire l'attention des spectateurs en premier.",
    de: "Vergleichen Sie zwei Thumbnails nebeneinander, um zu sehen, welches zuerst die Aufmerksamkeit erregt.",
    ja: "2つのサムネイルを並べて比較し、どちらが先に視聴者の視線を引きつけるかを検証します。"
  },
  "Variant A": { en: "Variant A", es: "Variante A", hi: "वैरिएंट A", fr: "Variante A", de: "Variante A", ja: "パターン A" },
  "Variant B": { en: "Variant B", es: "Variante B", hi: "वैरिएंट B", fr: "Variante B", de: "Variante B", ja: "パターン B" },
  "Upload Variant A": { en: "Upload Variant A", es: "Subir Variante A", hi: "वैरिएंट A अपलोड करें", fr: "Téléverser la Variante A", de: "Variante A Hochladen", ja: "パターンAをアップロード" },
  "Upload Variant B": { en: "Upload Variant B", es: "Subir Variante B", hi: "वैरिएंट B अपलोड करें", fr: "Téléverser la Variante B", de: "Variante B Hochladen", ja: "パターンBをアップロード" },

  // Guide Tab
  "Comprehensive Thumbnail Optimization Guide": {
    en: "Comprehensive Thumbnail Optimization Guide",
    es: "Guía Completa de Optimización de Miniaturas",
    hi: "संपूर्ण थंबनेल अनुकूलन गाइड",
    fr: "Guide Complet d'Optimisation des Miniatures",
    de: "Umfassender Leitfaden zur Thumbnail-Optimierung",
    ja: "完全版 サムネイル最適化ガイド"
  },
  "The Science of First 500ms Attention": {
    en: "The Science of First 500ms Attention",
    es: "La Ciencia de la Atención en los Primeros 500ms",
    hi: "पहले 500ms ध्यान का विज्ञान",
    fr: "La Science de l'Attention des 500 Premières ms",
    de: "Die Wissenschaft der ersten 500 ms Aufmerksamkeit",
    ja: "最初の500msにおける視線の科学"
  },
  "Whitepaper & Technical Architecture": {
    en: "Whitepaper & Technical Architecture",
    es: "Libro Blanco y Arquitectura Técnica",
    hi: "श्वेतपत्र और तकनीकी वास्तुकला",
    fr: "Livre Blanc & Architecture Technique",
    de: "Whitepaper & Technische Architektur",
    ja: "ホワイトペーパー＆技術アーキテクチャ"
  },
  "Interactive Engine Weight Simulator": {
    en: "Interactive Engine Weight Simulator",
    es: "Simulador Interactivo de Ponderación del Motor",
    hi: "इंटरएक्टिव इंजन वेटेज सिम्युलेटर",
    fr: "Simulateur Interactif de Pondération du Moteur",
    de: "Interaktiver Engine-Gewichtungssimulator",
    ja: "シグナル重み付けシミュレーター"
  },
  "Simulate how different computer vision signals combine into the final 100-point Attention Index.": {
    en: "Simulate how different computer vision signals combine into the final 100-point Attention Index.",
    es: "Simula cómo las diferentes señales de visión por computadora se combinan en el índice final de atención de 100 puntos.",
    hi: "देखें कि कंप्यूटर विज़न सिग्नल मिलकर 100 अंकों का अंतिम अटेंशन इंडेक्स कैसे बनाते हैं।",
    fr: "Simulez la manière dont les différents signaux de vision par ordinateur forment le score final d'attention sur 100.",
    de: "Simulieren Sie, wie verschiedene Computer-Vision-Signale zum finalen 100-Punkte-Aufmerksamkeitsindex verschmelzen.",
    ja: "各画像認識シグナルが組み合わさって100点満点のアテンション指数がどう算出されるかをシミュレーションできます。"
  },
  "Start Analyzing": { en: "Start Analyzing", es: "Comenzar a Analizar", hi: "विश्लेषण शुरू करें", fr: "Commencer l'Analyse", de: "Analyse Starten", ja: "分析を開始する" },
  "Explore Demos": { en: "Explore Demos", es: "Explorar Demostraciones", hi: "डेमो देखें", fr: "Explorer les Démos", de: "Demos Erkunden", ja: "デモを見る" },

  // System & Backend alerts
  "Backend Server Offline": { en: "Backend Server Offline", es: "Servidor Backend Desconectado", hi: "बैकएंड सर्वर ऑफ़लाइन है", fr: "Serveur Backend Hors Ligne", de: "Backend-Server Offline", ja: "バックエンドサーバーがオフラインです" },
  "The Python attention engine is not responding at": { en: "The Python attention engine is not responding at", es: "El motor de atención en Python no responde en", hi: "पायथन अटेंशन इंजन यहाँ प्रतिक्रिया नहीं दे रहा है:", fr: "Le moteur d'attention Python ne répond pas à l'adresse", de: "Die Python-Aufmerksamkeits-Engine antwortet nicht unter", ja: "Pythonアテンションエンジンから応答がありません:" },
  "Retry": { en: "Retry", es: "Reintentar", hi: "पुनः प्रयास करें", fr: "Réessayer", de: "Wiederholen", ja: "再試行" }
};

/**
 * Universal words and short terms for fallback token replacement.
 */
export const UNIVERSAL_WORDS: Record<string, Record<Language, string>> = {
  "Analyze": { en: "Analyze", es: "Analizar", hi: "विश्लेषण करें", fr: "Analyser", de: "Analysieren", ja: "分析" },
  "Results": { en: "Results", es: "Resultados", hi: "परिणाम", fr: "Résultats", de: "Ergebnisse", ja: "結果" },
  "Compare": { en: "Compare", es: "Comparar", hi: "तुलना करें", fr: "Comparer", de: "Vergleichen", ja: "比較" },
  "Battle": { en: "Battle", es: "Batalla", hi: "बैटल", fr: "Bataille", de: "Duell", ja: "対戦" },
  "Creator": { en: "Creator", es: "Creador", hi: "क्रिएटर", fr: "Créateur", de: "Creator", ja: "クリエイター" },
  "Guide": { en: "Guide", es: "Guía", hi: "गाइड", fr: "Guide", de: "Leitfaden", ja: "ガイド" },
  "Thumbnail": { en: "Thumbnail", es: "Miniatura", hi: "थंबनेल", fr: "Miniature", de: "Thumbnail", ja: "サムネイル" },
  "Thumbnails": { en: "Thumbnails", es: "Miniaturas", hi: "थंबनेल", fr: "Miniatures", de: "Thumbnails", ja: "サムネイル" },
  "Attention": { en: "Attention", es: "Atención", hi: "ध्यान", fr: "Attention", de: "Aufmerksamkeit", ja: "視線・注目" },
  "Score": { en: "Score", es: "Puntuación", hi: "स्कोर", fr: "Score", de: "Score", ja: "スコア" },
  "Heatmap": { en: "Heatmap", es: "Mapa de Calor", hi: "हीटमैप", fr: "Carte Thermique", de: "Heatmap", ja: "ヒートマップ" },
  "Saliency": { en: "Saliency", es: "Prominencia", hi: "सेलियेंसी", fr: "Saillance", de: "Salienz", ja: "サリエンス" },
  "Fixation": { en: "Fixation", es: "Fijación", hi: "फिक्सेशन", fr: "Fixation", de: "Fixierung", ja: "注視" },
  "Dimensions": { en: "Dimensions", es: "Dimensiones", hi: "आयाम", fr: "Dimensions", de: "Abmessungen", ja: "サイズ" },
  "High": { en: "High", es: "Alta", hi: "उच्च", fr: "Élevé", de: "Hoch", ja: "高" },
  "Med": { en: "Med", es: "Media", hi: "मध्यम", fr: "Moyen", de: "Mittel", ja: "中" },
  "Low": { en: "Low", es: "Baja", hi: "कम", fr: "Faible", de: "Niedrig", ja: "低" },
  "Original": { en: "Original", es: "Original", hi: "मूल", fr: "Original", de: "Original", ja: "オリジナル" },
  "Overlay": { en: "Overlay", es: "Superposición", hi: "ओवरले", fr: "Superposition", de: "Überlagerung", ja: "オーバーレイ" },
  "Interactive": { en: "Interactive", es: "Interactivo", hi: "इंटरएक्टिव", fr: "Interactif", de: "Interaktiv", ja: "対話型" },
  "Download": { en: "Download", es: "Descargar", hi: "डाउनलोड", fr: "Télécharger", de: "Herunterladen", ja: "ダウンロード" },
  "Export": { en: "Export", es: "Exportar", hi: "निर्यात", fr: "Exporter", de: "Exportieren", ja: "エクスポート" },
  "Retry": { en: "Retry", es: "Reintentar", hi: "पुनः प्रयास", fr: "Réessayer", de: "Wiederholen", ja: "再試行" },
  "Dismiss": { en: "Dismiss", es: "Descartar", hi: "खारिज करें", fr: "Ignorer", de: "Schließen", ja: "閉じる" },
  "Cancel": { en: "Cancel", es: "Cancelar", hi: "रद्द करें", fr: "Annuler", de: "Abbrechen", ja: "キャンセル" },
  "Close": { en: "Close", es: "Cerrar", hi: "बंद करें", fr: "Fermer", de: "Schließen", ja: "閉じる" },
  "Save": { en: "Save", es: "Guardar", hi: "सहेजें", fr: "Enregistrer", de: "Speichern", ja: "保存" },
  "Delete": { en: "Delete", es: "Eliminar", hi: "हटाएं", fr: "Supprimer", de: "Löschen", ja: "削除" },
  "Generate": { en: "Generate", es: "Generar", hi: "उत्पन्न करें", fr: "Générer", de: "Generieren", ja: "生成" },
  "Prompt": { en: "Prompt", es: "Instrucción", hi: "प्रॉम्प्ट", fr: "Invite", de: "Prompt", ja: "プロンプト" },
  "Tools": { en: "Tools", es: "Herramientas", hi: "उपकरण", fr: "Outils", de: "Werkzeuge", ja: "ツール" },
  "Layers": { en: "Layers", es: "Capas", hi: "परतें", fr: "Calques", de: "Ebenen", ja: "レイヤー" },
  "Templates": { en: "Templates", es: "Plantillas", hi: "टेम्पलेट", fr: "Modèles", de: "Vorlagen", ja: "テンプレート" },
  "Shuffle": { en: "Shuffle", es: "Mezclar", hi: "फेरबदल", fr: "Mélanger", de: "Mischen", ja: "シャッフル" },
  "Simulate": { en: "Simulate", es: "Simular", hi: "सिमुलेट करें", fr: "Simuler", de: "Simulieren", ja: "シミュレーション" },
  "Weights": { en: "Weights", es: "Pesos", hi: "भार", fr: "Poids", de: "Gewichte", ja: "重み付け" },
  "Language": { en: "Language", es: "Idioma", hi: "भाषा", fr: "Langue", de: "Sprache", ja: "言語" },
  "English": { en: "English", es: "Inglés", hi: "अंग्रेज़ी", fr: "Anglais", de: "Englisch", ja: "英語" },
  "Spanish": { en: "Spanish", es: "Español", hi: "स्पेनिश", fr: "Espagnol", de: "Spanisch", ja: "スペイン語" },
  "Hindi": { en: "Hindi", es: "Hindi", hi: "हिन्दी", fr: "Hindi", de: "Hindi", ja: "ヒンディー語" },
  "French": { en: "French", es: "Francés", hi: "फ़्रेंच", fr: "Français", de: "Französisch", ja: "フランス語" },
  "German": { en: "German", es: "Alemán", hi: "जर्मन", fr: "Allemand", de: "Deutsch", ja: "ドイツ語" },
  "Japanese": { en: "Japanese", es: "Japonés", hi: "जापानी", fr: "Japonais", de: "Japanisch", ja: "日本語" },
};

// Sorted list of universal phrases (longest phrases first for greedy matching)
const PHRASE_KEYS_SORTED = Object.keys(UNIVERSAL_PHRASES).sort((a, b) => b.length - a.length);

/**
 * Translates any DOM text string into the target language.
 */
export function translateDomText(rawText: string, lang: Language): string {
  if (lang === 'en' || !rawText) return rawText;

  // Preserve leading and trailing whitespaces/newlines
  const match = rawText.match(/^(\s*)([\s\S]*?)(\s*)$/);
  if (!match) return rawText;
  const [, leading, trimmed, trailing] = match;
  if (!trimmed) return rawText;

  // 1. Direct match in UNIVERSAL_PHRASES
  if (UNIVERSAL_PHRASES[trimmed] && UNIVERSAL_PHRASES[trimmed][lang]) {
    return leading + UNIVERSAL_PHRASES[trimmed][lang] + trailing;
  }

  // 2. Case-insensitive phrase check
  const lowerTrimmed = trimmed.toLowerCase();
  for (const phrase of PHRASE_KEYS_SORTED) {
    if (phrase.toLowerCase() === lowerTrimmed) {
      const trans = UNIVERSAL_PHRASES[phrase][lang];
      if (trans) return leading + trans + trailing;
    }
  }

  // 3. Structured pattern match: "Step X: [Text]"
  const stepMatch = trimmed.match(/^Step\s+(\d+):\s*(.*)$/i);
  if (stepMatch) {
    const stepNum = stepMatch[1];
    const rest = translateDomText(stepMatch[2], lang);
    const stepPrefixes: Record<Language, string> = {
      en: 'Step',
      es: 'Paso',
      hi: 'चरण',
      fr: 'Étape',
      de: 'Schritt',
      ja: 'ステップ',
    };
    return leading + `${stepPrefixes[lang] || 'Step'} ${stepNum}: ${rest}` + trailing;
  }

  // 4. Structured pattern match: "Active analysis: [filename] ([score]/100)"
  const activeMatch = trimmed.match(/^Active analysis:\s*(.*)$/i);
  if (activeMatch) {
    const prefixes: Record<Language, string> = {
      en: 'Active analysis:',
      es: 'Análisis activo:',
      hi: 'सक्रिय विश्लेषण:',
      fr: 'Analyse active :',
      de: 'Aktive Analyse:',
      ja: '進行中の分析:',
    };
    return leading + `${prefixes[lang] || 'Active analysis:'} ${activeMatch[1]}` + trailing;
  }

  // 5. Greedy substring replacement for composite phrases
  let workingText = trimmed;
  let hasReplaced = false;

  for (const phrase of PHRASE_KEYS_SORTED) {
    if (phrase.length > 3 && workingText.includes(phrase)) {
      const trans = UNIVERSAL_PHRASES[phrase][lang];
      if (trans) {
        workingText = workingText.split(phrase).join(trans);
        hasReplaced = true;
      }
    }
  }

  // 6. Word replacement for remaining standalone tokens
  if (!hasReplaced) {
    for (const [word, transMap] of Object.entries(UNIVERSAL_WORDS)) {
      if (word.length > 2 && transMap[lang]) {
        // Regex word boundary matching
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        if (regex.test(workingText)) {
          workingText = workingText.replace(regex, transMap[lang]);
          hasReplaced = true;
        }
      }
    }
  }

  return leading + workingText + trailing;
}
