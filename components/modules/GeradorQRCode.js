import React, { useState, useRef, useEffect } from 'react';
import { 
  QrCode, Download, Sparkles, Copy, Check, Image as ImageIcon, Link as LinkIcon, 
  Smartphone, DollarSign, Palette, Wifi, Mail, MapPin, Contact, Sliders, 
  ChevronDown, ChevronUp, Zap, FileText, Globe, Upload, CheckCircle2, RefreshCw,
  Facebook, Twitter, Youtube, Instagram, Linkedin, MessageCircle, Bitcoin,
  BarChart3, Activity, TrendingUp, Eye, ExternalLink, Trash2, Edit3, Save, Shield,
  PieChart, Monitor, Layers, Filter, CheckCircle, Grid, Circle, Square, Layout, Printer, Code
} from 'lucide-react';

// SVGs OFICIAIS DE ALTA FIDELIDADE ESTILO QRCODE MONKEY
const LOGO_PRESETS = [
  { id: 'none', label: 'SEM LOGO', color: '#666', bg: 'rgba(255,255,255,0.05)', svg: null },
  { 
    id: 'whatsapp', label: 'WhatsApp', color: '#ffffff', bg: '#25D366',
    svg: `<svg viewBox="0 0 24 24" width="22" height="22" fill="white"><path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.764.459 3.487 1.333 5.008L2 22l5.12-1.337c1.474.802 3.14 1.226 4.887 1.227h.005c5.503 0 9.986-4.479 9.987-9.986 0-2.668-1.038-5.176-2.924-7.063C17.189 3.037 14.68 2 12.012 2zm5.836 14.282c-.247.697-1.442 1.33-1.992 1.411-.504.075-1.162.107-1.87-.121-.43-.138-1.013-.33-1.748-.65-3.097-1.35-5.116-4.48-5.271-4.69-.153-.207-1.258-1.677-1.258-3.197 0-1.52.793-2.268 1.077-2.558.283-.29.619-.363.824-.363.206 0 .412.002.59.01.19.008.444-.072.697.533.257.615.875 2.133.952 2.288.077.155.128.337.025.542-.103.207-.154.337-.308.517-.154.18-.324.402-.463.54-.154.154-.314.322-.134.63.18.309.8 1.32 1.716 2.136 1.176 1.049 2.167 1.374 2.476 1.528.309.154.49.129.67-.077.18-.206.772-.899.978-1.208.206-.309.412-.257.696-.154.283.103 1.8.849 2.108 1.003.309.154.515.232.592.36.077.129.077.747-.17 1.444z"/></svg>` 
  },
  { 
    id: 'pix', label: 'PIX Bacen', color: '#ffffff', bg: '#32BCAD',
    svg: `<svg viewBox="0 0 512 512" width="22" height="22" fill="white"><path d="M112.5 128L256 244.7 399.5 128 448 167.5 256 324 64 167.5z"/><path d="M256 384l-143.5-116.5L64 307 256 463.5 448 307l-48.5-39.5z"/></svg>`
  },
  { 
    id: 'instagram', label: 'Instagram', color: '#ffffff', bg: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
    svg: `<svg viewBox="0 0 24 24" width="22" height="22" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`
  },
  { 
    id: 'facebook', label: 'Facebook', color: '#ffffff', bg: '#1877F2',
    svg: `<svg viewBox="0 0 24 24" width="22" height="22" fill="white"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/></svg>`
  },
  { 
    id: 'youtube', label: 'YouTube', color: '#ffffff', bg: '#FF0000',
    svg: `<svg viewBox="0 0 24 24" width="22" height="22" fill="white"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`
  },
  { 
    id: 'twitter', label: 'Twitter / X', color: '#ffffff', bg: '#1DA1F2',
    svg: `<svg viewBox="0 0 24 24" width="22" height="22" fill="white"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z"/></svg>`
  },
  { 
    id: 'linkedin', label: 'LinkedIn', color: '#ffffff', bg: '#0A66C2',
    svg: `<svg viewBox="0 0 24 24" width="22" height="22" fill="white"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>`
  },
  { 
    id: 'wifi', label: 'Wi-Fi', color: '#ffffff', bg: '#00F0FF',
    svg: `<svg viewBox="0 0 24 24" width="22" height="22" fill="white"><path d="M12 3C7.03 3 2.56 4.97.97 8.16l1.77 1.77C4.15 7.22 7.84 5.5 12 5.5s7.85 1.72 9.26 4.43l1.77-1.77C21.44 4.97 16.97 3 12 3zm0 6c-3.31 0-6.3 1.34-8.49 3.51l1.77 1.77C6.79 12.78 9.27 11.5 12 11.5s5.21 1.28 6.72 2.78l1.77-1.77C18.3 10.34 15.31 9 12 9zm0 6c-1.66 0-3.16.67-4.24 1.76l4.24 4.24 4.24-4.24C15.16 15.67 13.66 15 12 15z"/></svg>`
  },
  { 
    id: 'bitcoin', label: 'Bitcoin', color: '#ffffff', bg: '#F7931A',
    svg: `<svg viewBox="0 0 24 24" width="22" height="22" fill="white"><path d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.548zM15.93 10.67c.28-.936-.572-1.44-1.545-1.776l.316-1.267-.77-.193-.308 1.236c-.203-.05-.412-.098-.62-.147l.31-1.243-.77-.192-.316 1.266c-.167-.038-.33-.077-.49-.116l.002-.01-.1.025-1.063-.266-.205.824s.572.13.56.139c.312.078.368.286.358.45l-.36 1.44c.022.006.05.015.08.03l-.082-.02-.503 2.016c-.038.094-.136.236-.356.181.01.015-.56-.14-.56-.14l-.382.88 1.003.25c.187.047.37.098.552.144l-.32 1.286.77.192.316-1.267c.21.057.414.11.614.16l-.316 1.266.77.193.32-1.28c1.314.25 2.302.148 2.718-.104.33-.2.58-.574.407-1.18-.14-.49-.496-.867-1.077-1.037.423-.098.742-.303.827-.768zM13.7 13.09c-.238.96-1.85.44-2.373.31l.423-1.696c.523.13 2.196.388 1.95 1.386zm.24-2.45c-.218.874-1.57.43-2.007.322l.384-1.54c.438.11 1.847.315 1.623 1.218z"/></svg>`
  }
];

// FORMAS ESTILO QRCODE MONKEY (BODY SHAPE, EYE FRAME, EYE BALL) COM PREVIEWS SVG AUTÊNTICOS
const BODY_SHAPES = [
  {
    id: 'square',
    apiKey: 'square',
    label: 'Quadrado',
    svg: `<svg viewBox="0 0 32 32" width="28" height="28" fill="currentColor">
      <rect x="2" y="2" width="7.5" height="7.5" />
      <rect x="12.2" y="2" width="7.5" height="7.5" />
      <rect x="22.5" y="2" width="7.5" height="7.5" />
      <rect x="2" y="12.2" width="7.5" height="7.5" />
      <rect x="12.2" y="12.2" width="7.5" height="7.5" />
      <rect x="22.5" y="12.2" width="7.5" height="7.5" />
      <rect x="2" y="22.5" width="7.5" height="7.5" />
      <rect x="12.2" y="22.5" width="7.5" height="7.5" />
      <rect x="22.5" y="22.5" width="7.5" height="7.5" />
    </svg>`
  },
  {
    id: 'mosaic',
    apiKey: 'mosaic',
    label: 'Mosaico',
    svg: `<svg viewBox="0 0 32 32" width="28" height="28" fill="currentColor">
      <path d="M2,2 h18 v8 h-8 v10 h-10 Z" />
      <path d="M22,2 h8 v18 h-8 v-8 h-10 v-2 h10 Z" />
      <path d="M2,22 h18 v8 h-18 Z" />
      <path d="M22,22 h8 v8 h-8 Z" />
    </svg>`
  },
  {
    id: 'circle',
    apiKey: 'circle',
    label: 'Círculos Encorpados',
    svg: `<svg viewBox="0 0 32 32" width="28" height="28" fill="currentColor">
      <circle cx="5.5" cy="5.5" r="4.5" />
      <circle cx="16" cy="5.5" r="4.5" />
      <circle cx="26.5" cy="5.5" r="4.5" />
      <circle cx="5.5" cy="16" r="4.5" />
      <circle cx="16" cy="16" r="4.5" />
      <circle cx="26.5" cy="16" r="4.5" />
      <circle cx="5.5" cy="26.5" r="4.5" />
      <circle cx="16" cy="26.5" r="4.5" />
      <circle cx="26.5" cy="26.5" r="4.5" />
    </svg>`
  },
  {
    id: 'dot',
    apiKey: 'dot',
    label: 'Pontos Suaves',
    svg: `<svg viewBox="0 0 32 32" width="28" height="28" fill="currentColor">
      <circle cx="5.5" cy="5.5" r="3" />
      <circle cx="16" cy="5.5" r="3" />
      <circle cx="26.5" cy="5.5" r="3" />
      <circle cx="5.5" cy="16" r="3" />
      <circle cx="16" cy="16" r="3" />
      <circle cx="26.5" cy="16" r="3" />
      <circle cx="5.5" cy="26.5" r="3" />
      <circle cx="16" cy="26.5" r="3" />
      <circle cx="26.5" cy="26.5" r="3" />
    </svg>`
  },
  {
    id: 'rounded',
    apiKey: 'round',
    label: 'Arredondado',
    svg: `<svg viewBox="0 0 32 32" width="28" height="28" fill="currentColor">
      <rect x="2" y="2" width="7.5" height="7.5" rx="3.5" />
      <rect x="12.2" y="2" width="7.5" height="7.5" rx="3.5" />
      <rect x="22.5" y="2" width="7.5" height="7.5" rx="3.5" />
      <rect x="2" y="12.2" width="7.5" height="7.5" rx="3.5" />
      <rect x="12.2" y="12.2" width="7.5" height="7.5" rx="3.5" />
      <rect x="22.5" y="12.2" width="7.5" height="7.5" rx="3.5" />
      <rect x="2" y="22.5" width="7.5" height="7.5" rx="3.5" />
      <rect x="12.2" y="22.5" width="7.5" height="7.5" rx="3.5" />
      <rect x="22.5" y="22.5" width="7.5" height="7.5" rx="3.5" />
    </svg>`
  },
  {
    id: 'rounded-pointed',
    apiKey: 'rounded-pointed',
    label: 'Arredondado Bico',
    svg: `<svg viewBox="0 0 32 32" width="28" height="28" fill="currentColor">
      <path d="M2,2 h7.5 v7.5 h-7.5 Z" />
      <circle cx="16" cy="5.5" r="3.8" />
      <rect x="22.5" y="2" width="7.5" height="7.5" rx="3" />
      <rect x="2" y="12.2" width="7.5" height="7.5" rx="3" />
      <circle cx="16" cy="16" r="3.8" />
      <rect x="22.5" y="12.2" width="7.5" height="7.5" rx="3" />
      <rect x="2" y="22.5" width="7.5" height="7.5" rx="3" />
      <circle cx="16" cy="26.5" r="3.8" />
      <rect x="22.5" y="22.5" width="7.5" height="7.5" rx="3" />
    </svg>`
  },
  {
    id: 'circle-zebra-vertical',
    apiKey: 'circle-zebra-vertical',
    label: 'Zebra Vertical',
    svg: `<svg viewBox="0 0 32 32" width="28" height="28" fill="currentColor">
      <rect x="3" y="2" width="6" height="17" rx="3" />
      <rect x="13" y="2" width="6" height="8" rx="3" />
      <rect x="23" y="2" width="6" height="27" rx="3" />
      <rect x="3" y="21" width="6" height="8" rx="3" />
      <rect x="13" y="12" width="6" height="17" rx="3" />
    </svg>`
  },
  {
    id: 'diamond',
    apiKey: 'diamond',
    label: 'Diamante',
    svg: `<svg viewBox="0 0 32 32" width="28" height="28" fill="currentColor">
      <polygon points="5.5,1 9.5,5.5 5.5,10 1.5,5.5" />
      <polygon points="16,1 20,5.5 16,10 12,5.5" />
      <polygon points="26.5,1 30.5,5.5 26.5,10 22.5,5.5" />
      <polygon points="5.5,11.5 9.5,16 5.5,20.5 1.5,16" />
      <polygon points="16,11.5 20,16 16,20.5 12,16" />
      <polygon points="26.5,11.5 30.5,16 26.5,20.5 22.5,16" />
      <polygon points="5.5,22 9.5,26.5 5.5,31 1.5,26.5" />
      <polygon points="16,22 20,26.5 16,31 12,26.5" />
      <polygon points="26.5,22 30.5,26.5 26.5,31 22.5,26.5" />
    </svg>`
  },
  {
    id: 'star',
    apiKey: 'star',
    label: 'Estrela Pro',
    svg: `<svg viewBox="0 0 32 32" width="28" height="28" fill="currentColor">
      <path d="M5.5,2 L6.8,4.5 L9.5,5.5 L6.8,6.5 L5.5,9 L4.2,6.5 L1.5,5.5 L4.2,4.5 Z" />
      <path d="M16,2 L17.3,4.5 L20,5.5 L17.3,6.5 L16,9 L14.7,6.5 L12,5.5 L14.7,4.5 Z" />
      <path d="M26.5,2 L27.8,4.5 L30.5,5.5 L27.8,6.5 L26.5,9 L25.2,6.5 L22.5,5.5 L25.2,4.5 Z" />
      <path d="M5.5,12.5 L6.8,15 L9.5,16 L6.8,17 L5.5,19.5 L4.2,17 L1.5,16 L4.2,15 Z" />
      <path d="M16,12.5 L17.3,15 L20,16 L17.3,17 L16,19.5 L14.7,17 L12,16 L14.7,15 Z" />
      <path d="M26.5,12.5 L27.8,15 L30.5,16 L27.8,17 L26.5,19.5 L25.2,17 L22.5,16 L25.2,15 Z" />
      <path d="M5.5,23 L6.8,25.5 L9.5,26.5 L6.8,27.5 L5.5,30 L4.2,27.5 L1.5,26.5 L4.2,25.5 Z" />
      <path d="M16,23 L17.3,25.5 L20,26.5 L17.3,27.5 L16,30 L14.7,27.5 L12,26.5 L14.7,25.5 Z" />
      <path d="M26.5,23 L27.8,25.5 L30.5,26.5 L27.8,27.5 L26.5,30 L25.2,27.5 L22.5,26.5 L25.2,25.5 Z" />
    </svg>`
  }
];

const EYE_FRAME_SHAPES = [
  {
    id: 'square',
    apiKey: 'frame0',
    label: 'Quadrado Rígido',
    svg: `<svg viewBox="0 0 32 32" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="4"><rect x="3" y="3" width="26" height="26" /></svg>`
  },
  {
    id: 'rounded',
    apiKey: 'frame1',
    label: 'Arredondado',
    svg: `<svg viewBox="0 0 32 32" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="4"><rect x="3" y="3" width="26" height="26" rx="8" /></svg>`
  },
  {
    id: 'leaf-right',
    apiKey: 'frame2',
    label: 'Folha Curva',
    svg: `<svg viewBox="0 0 32 32" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="4"><path d="M3,3 h18 a8,8 0 0 1 8,8 v18 h-18 a8,8 0 0 1 -8,-8 Z" /></svg>`
  },
  {
    id: 'leaf-left',
    apiKey: 'frame3',
    label: 'Gota Invertida',
    svg: `<svg viewBox="0 0 32 32" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="4"><path d="M3,11 a8,8 0 0 1 8,-8 h18 v18 a8,8 0 0 1 -8,8 h-18 Z" /></svg>`
  },
  {
    id: 'circle',
    apiKey: 'frame6',
    label: 'Círculo Perfeito',
    svg: `<svg viewBox="0 0 32 32" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="4"><circle cx="16" cy="16" r="13" /></svg>`
  },
  {
    id: 'smooth-rounded',
    apiKey: 'frame7',
    label: 'Suave Soft',
    svg: `<svg viewBox="0 0 32 32" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="4"><rect x="3" y="3" width="26" height="26" rx="13" /></svg>`
  },
  {
    id: 'scallop',
    apiKey: 'frame13',
    label: 'Chanfrado',
    svg: `<svg viewBox="0 0 32 32" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="4"><path d="M8,3 h16 l5,5 v16 l-5,5 h-16 l-5,-5 v-16 Z" /></svg>`
  },
  {
    id: 'dots-frame',
    apiKey: 'frame14',
    label: 'Pontos Moldura',
    svg: `<svg viewBox="0 0 32 32" width="26" height="26" fill="currentColor"><circle cx="5" cy="5" r="2.5"/><circle cx="16" cy="5" r="2.5"/><circle cx="27" cy="5" r="2.5"/><circle cx="5" cy="16" r="2.5"/><circle cx="27" cy="16" r="2.5"/><circle cx="5" cy="27" r="2.5"/><circle cx="16" cy="27" r="2.5"/><circle cx="27" cy="27" r="2.5"/></svg>`
  }
];

const EYE_BALL_SHAPES = [
  {
    id: 'square',
    apiKey: 'ball0',
    label: 'Quadrado',
    svg: `<svg viewBox="0 0 32 32" width="22" height="22" fill="currentColor"><rect x="4" y="4" width="24" height="24" /></svg>`
  },
  {
    id: 'rounded',
    apiKey: 'ball1',
    label: 'Arredondado',
    svg: `<svg viewBox="0 0 32 32" width="22" height="22" fill="currentColor"><rect x="4" y="4" width="24" height="24" rx="7" /></svg>`
  },
  {
    id: 'leaf-right',
    apiKey: 'ball2',
    label: 'Gota Direita',
    svg: `<svg viewBox="0 0 32 32" width="22" height="22" fill="currentColor"><path d="M4,4 h16 a6,6 0 0 1 6,6 v16 h-16 a6,6 0 0 1 -6,-6 Z" /></svg>`
  },
  {
    id: 'leaf-left',
    apiKey: 'ball3',
    label: 'Gota Esquerda',
    svg: `<svg viewBox="0 0 32 32" width="22" height="22" fill="currentColor"><path d="M4,10 a6,6 0 0 1 6,-6 h16 v16 a6,6 0 0 1 -6,6 h-16 Z" /></svg>`
  },
  {
    id: 'circle',
    apiKey: 'ball6',
    label: 'Círculo',
    svg: `<svg viewBox="0 0 32 32" width="22" height="22" fill="currentColor"><circle cx="16" cy="16" r="12" /></svg>`
  },
  {
    id: 'pills-h',
    apiKey: 'ball10',
    label: 'Barras H.',
    svg: `<svg viewBox="0 0 32 32" width="22" height="22" fill="currentColor"><rect x="3" y="4" width="26" height="5" rx="2.5"/><rect x="3" y="13.5" width="26" height="5" rx="2.5"/><rect x="3" y="23" width="26" height="5" rx="2.5"/></svg>`
  },
  {
    id: 'pills-v',
    apiKey: 'ball11',
    label: 'Barras V.',
    svg: `<svg viewBox="0 0 32 32" width="22" height="22" fill="currentColor"><rect x="4" y="3" width="5" height="26" rx="2.5"/><rect x="13.5" y="3" width="5" height="26" rx="2.5"/><rect x="23" y="3" width="5" height="26" rx="2.5"/></svg>`
  },
  {
    id: 'diamond',
    apiKey: 'ball12',
    label: 'Diamante',
    svg: `<svg viewBox="0 0 32 32" width="22" height="22" fill="currentColor"><polygon points="16,2 30,16 16,30 2,16" /></svg>`
  },
  {
    id: 'flower',
    apiKey: 'ball13',
    label: 'Estrela / Flor',
    svg: `<svg viewBox="0 0 32 32" width="22" height="22" fill="currentColor"><path d="M16,2 L20,12 L30,16 L20,20 L16,30 L12,20 L2,16 L12,12 Z" /></svg>`
  }
];

export default function GeradorQRCode({ onOpenIA }) {
  // NAVEGAÇÃO DE VISTAS (GERADOR | RELATÓRIOS & CLIQUES | GERENCIADOR DE LINKS DINÂMICOS)
  const [activeTab, setActiveTab] = useState('generator');

  // ABA DE CONTEÚDO NO GERADOR (URL | TEXT | EMAIL | PHONE | SMS | VCARD | WIFI | PIX | BITCOIN)
  const [contentType, setContentType] = useState('url');
  const [activeAccordion, setActiveAccordion] = useState('content');

  // DADOS DO QR CODE ATUAL
  const [qrName, setQrName] = useState('QR Campanha - Panfleto Central');
  const [url, setUrl] = useState('https://eleger.app.br/candidato');
  const [text, setText] = useState('Vote 9999 - Para um futuro melhor!');
  const [emailData, setEmailData] = useState({ to: 'gabinete@camara.gov.br', subject: 'Apoio à Indicação', body: 'Gostaria de solicitar apoio...' });
  const [phone, setPhone] = useState('5561999990000');
  const [smsData, setSmsData] = useState({ phone: '5561999990000', message: 'Quero apoiar a campanha!' });
  const [vcard, setVcard] = useState({ name: 'Carlos Eduardo', title: 'Candidato a Vereador', phone: '(61) 99999-0000', email: 'contato@carloseduardo.com.br', website: 'https://carloseduardo.com.br' });
  const [wifi, setWifi] = useState({ ssid: 'Gabinete_Visitantes', pass: 'democracia2026', enc: 'WPA' });
  const [pix, setPix] = useState({ key: '12.345.678/0001-90', name: 'Campanha Carlos Eduardo 2026', amount: '' });
  const [bitcoin, setBitcoin] = useState({ address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', amount: '' });

  // CONFIGURAÇÃO DE RASTREIO E ANALYTICS DINÂMICO
  const [isDynamic, setIsDynamic] = useState(true);
  const [savedQrs, setSavedQrs] = useState([]);

  // CORES (PADRÃO: FUNDO BRANCO #ffffff, ARTE PRETA #000000)
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');

  // LOGO CENTRAL E REMOVER BG
  const [selectedLogo, setSelectedLogo] = useState('none');
  const [customLogoUrl, setCustomLogoUrl] = useState(null);
  const [removeBgBehindLogo, setRemoveBgBehindLogo] = useState(true);

  // FORMAS CUSTOMIZADAS (BODY, EYE FRAME, EYE BALL) ESTILO QRCODE MONKEY
  const [bodyShape, setBodyShape] = useState('square');
  const [eyeFrameShape, setEyeFrameShape] = useState('square');
  const [eyeBallShape, setEyeBallShape] = useState('square');

  // ESTADOS DE INTERAÇÃO & EXPORTAÇÃO
  const [resolution, setResolution] = useState(1000);
  const [isGenerating, setIsGenerating] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  // EXIBIR FEEDBACK TEMPORÁRIO
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const getRawContent = () => {
    switch (contentType) {
      case 'url':
        return url.startsWith('http') ? url : `https://${url}`;
      case 'text':
        return text;
      case 'email':
        return `mailto:${emailData.to}?subject=${encodeURIComponent(emailData.subject)}&body=${encodeURIComponent(emailData.body)}`;
      case 'phone':
        return `tel:${phone}`;
      case 'sms':
        return `smsto:${smsData.phone}:${smsData.message}`;
      case 'vcard':
        return `BEGIN:VCARD\nVERSION:3.0\nN:${vcard.name}\nTITLE:${vcard.title}\nTEL:${vcard.phone}\nEMAIL:${vcard.email}\nURL:${vcard.website}\nEND:VCARD`;
      case 'wifi':
        return `WIFI:S:${wifi.ssid};T:${wifi.enc};P:${wifi.pass};;`;
      case 'pix':
        return pix.key;
      case 'bitcoin':
        return `bitcoin:${bitcoin.address}`;
      default:
        return url;
    }
  };

  const getQrCodePayload = () => {
    const raw = getRawContent();
    if (isDynamic) {
      const activeId = savedQrs.length > 0 ? savedQrs[0].id : 'qr-101';
      const origin = typeof window !== 'undefined' ? window.location.origin : 'https://eleger.app.br';
      return `${origin}/s/${activeId}?url=${encodeURIComponent(raw)}`;
    }
    return raw;
  };

  // API MATRIZ DE QR CODE REAL COM CUSTOMIZAÇÃO COMPLETA (QRCODE MONKEY API)
  const payloadData = getQrCodePayload();
  const cleanFg = fgColor.startsWith('#') ? fgColor : `#${fgColor}`;
  const cleanBg = bgColor.startsWith('#') ? bgColor : `#${bgColor}`;

  // MAPEAMENTO DE SHAPES PARA VALORES DA API QRCODE MONKEY
  const activeBodyObj = BODY_SHAPES.find(s => s.id === bodyShape) || BODY_SHAPES[0];
  const activeEyeFrameObj = EYE_FRAME_SHAPES.find(s => s.id === eyeFrameShape) || EYE_FRAME_SHAPES[0];
  const activeEyeBallObj = EYE_BALL_SHAPES.find(s => s.id === eyeBallShape) || EYE_BALL_SHAPES[0];

  const qrConfig = {
    body: activeBodyObj.apiKey,
    eye: activeEyeFrameObj.apiKey,
    eyeBall: activeEyeBallObj.apiKey,
    bodyColor: cleanFg,
    bgColor: cleanBg,
    eye1Color: cleanFg,
    eye2Color: cleanFg,
    eye3Color: cleanFg,
    eyeBall1Color: cleanFg,
    eyeBall2Color: cleanFg,
    eyeBall3Color: cleanFg
  };

  const qrApiUrl = `https://api.qrcode-monkey.com/qr/custom?data=${encodeURIComponent(payloadData)}&config=${encodeURIComponent(JSON.stringify(qrConfig))}&size=600&file=png`;

  useEffect(() => {
    const localData = typeof window !== 'undefined' ? localStorage.getItem('crm_qrcodes') : null;
    if (localData) {
      try {
        setSavedQrs(JSON.parse(localData));
        return;
      } catch (e) {
        console.error(e);
      }
    }
    
    const defaultMock = [
      {
        id: 'qr-101',
        name: 'QR Panfleto Zona Norte',
        content: 'https://eleger.app.br/agenda-zona-norte',
        contentType: 'url',
        isDynamic: true,
        scans: 482,
        createdAt: '16/08/2026 14:30',
        bgColor: '#ffffff',
        fgColor: '#000000'
      },
      {
        id: 'qr-102',
        name: 'QR Adesivo de Carro Oficial',
        content: 'https://wa.me/5561999990000?text=Quero%20apoiar',
        contentType: 'phone',
        isDynamic: true,
        scans: 1420,
        createdAt: '15/08/2026 10:15',
        bgColor: '#ffffff',
        fgColor: '#25d366'
      }
    ];
    setSavedQrs(defaultMock);
    if (typeof window !== 'undefined') {
      localStorage.setItem('crm_qrcodes', JSON.stringify(defaultMock));
    }
  }, []);

  const updateSavedQrsState = (newArray) => {
    setSavedQrs(newArray);
    if (typeof window !== 'undefined') {
      localStorage.setItem('crm_qrcodes', JSON.stringify(newArray));
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      showToast('✨ QR Code escaneável gerado com sucesso!');
    }, 300);
  };

  const handleSaveQrCode = () => {
    const generatedId = `qr-${Date.now().toString().slice(-4)}`;
    const currentContent = getRawContent();
    
    const newRecord = {
      id: generatedId,
      name: qrName || 'QR Code Sem Nome',
      content: currentContent,
      contentType,
      isDynamic,
      scans: 0,
      createdAt: new Date().toLocaleString('pt-BR'),
      bgColor,
      fgColor
    };

    const updated = [newRecord, ...savedQrs];
    updateSavedQrsState(updated);
    showToast(`✅ QR Code '${newRecord.name}' salvo com sucesso!`);
  };

  const handleSimulateScan = (id) => {
    const updated = savedQrs.map(qr => qr.id === id ? { ...qr, scans: qr.scans + 1 } : qr);
    updateSavedQrsState(updated);
    showToast('📈 Escaneamento contabilizado no relatório!');
  };

  const handleCopyTrackingLink = (id) => {
    const trackingUrl = `${window.location.origin}/s/${id}`;
    navigator.clipboard.writeText(trackingUrl);
    setCopiedId(id);
    showToast('📋 Link de Rastreio Copiado!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDeleteQr = (id) => {
    if (confirm('Tem certeza que deseja excluir este QR Code?')) {
      const updated = savedQrs.filter(q => q.id !== id);
      updateSavedQrsState(updated);
      showToast('🗑️ QR Code excluído.');
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setCustomLogoUrl(uploadEvent.target.result);
        setSelectedLogo('custom');
        showToast('Logo da marca enviada e sobreposta!');
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadPNG = () => {
    const image = new Image();
    image.crossOrigin = 'Anonymous';
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = resolution;
      canvas.height = resolution;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, resolution, resolution);
      ctx.drawImage(image, 0, 0, resolution, resolution);

      if (selectedLogo !== 'none') {
        const logoSize = resolution * 0.22;
        const logoX = (resolution - logoSize) / 2;
        const logoY = (resolution - logoSize) / 2;

        if (removeBgBehindLogo) {
          ctx.fillStyle = bgColor;
          ctx.beginPath();
          ctx.roundRect(logoX - 12, logoY - 12, logoSize + 24, logoSize + 24, 20);
          ctx.fill();
        }

        const currentPreset = LOGO_PRESETS.find(p => p.id === selectedLogo);
        if (currentPreset && currentPreset.bg) {
          ctx.fillStyle = currentPreset.bg.startsWith('#') ? currentPreset.bg : '#32BCAD';
          ctx.beginPath();
          ctx.roundRect(logoX, logoY, logoSize, logoSize, 16);
          ctx.fill();
        }
      }

      const pngURL = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngURL;
      downloadLink.download = `qrcode_${contentType}_${Date.now()}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      showToast('📥 PNG de alta definição baixado!');
    };
    image.src = qrApiUrl;
  };

  const downloadSVG = () => {
    const svgUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${resolution}x${resolution}&data=${encodeURIComponent(payloadData)}&color=${cleanFg}&bgcolor=${cleanBg}&format=svg`;
    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = `qrcode_${contentType}_${Date.now()}.svg`;
    downloadLink.target = '_blank';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    showToast('📥 Vetor SVG salvo!');
  };

  const downloadPDF = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head><title>Imprimir QR Code - CRM Político</title></head>
        <body style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; font-family:sans-serif; background:#f4f4f5;">
          <h2>QR Code em Vetor de Alta Fidelidade (100% Escaneável)</h2>
          <div style="background:${bgColor}; padding:30px; border-radius:16px; box-shadow:0 10px 30px rgba(0,0,0,0.15);">
            <img src="${qrApiUrl}" width="300" height="300" />
          </div>
          <p style="margin-top:20px; color:#666; font-weight:bold;">CRM Político - Módulo de Impressão Vetorial</p>
          <script>window.onload = function() { window.print(); window.close(); }</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const totalScans = savedQrs.reduce((acc, q) => acc + (q.scans || 0), 0);
  const activeCodesCount = savedQrs.length;
  const activePresetLogo = LOGO_PRESETS.find(p => p.id === selectedLogo);
  const currentEyeFrame = EYE_FRAME_SHAPES.find(e => e.id === eyeFrameShape);
  const currentEyeBall = EYE_BALL_SHAPES.find(e => e.id === eyeBallShape);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 'calc(100vh - 100px)', gap: '0.8rem', position: 'relative' }}>
      
      {/* TOAST NOTIFICAÇÃO FEEDBACK */}
      {toastMessage && (
        <div style={{
          position: 'absolute', top: '15px', right: '20px', zIndex: 1000,
          background: 'rgba(16, 185, 129, 0.95)', color: '#fff', padding: '0.8rem 1.2rem',
          borderRadius: '8px', fontWeight: 'bold', boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
          display: 'flex', alignItems: 'center', gap: '0.5rem', backdropFilter: 'blur(10px)'
        }}>
          <CheckCircle2 size={18} /> {toastMessage}
        </div>
      )}

      {/* HEADER PRINCIPAL + SUBNAVEGAÇÃO */}
      <div className="section-card liquid-glass" style={{ padding: '0.8rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <QrCode color="var(--accent)" size={22} /> Gerador & Rastreio de QR Code Pro
          </h2>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Crie QR Codes 100% escaneáveis com personalização completa de marcas e formas no estilo QRCode Monkey.
          </span>
        </div>

        {/* NAVEGAÇÃO DE VISTAS */}
        <div style={{ display: 'flex', gap: '0.4rem', background: 'rgba(0,0,0,0.3)', padding: '0.3rem', borderRadius: '8px' }}>
          <button 
            onClick={() => setActiveTab('generator')}
            style={{
              padding: '0.4rem 0.9rem', borderRadius: '6px', border: 'none',
              background: activeTab === 'generator' ? 'var(--accent)' : 'transparent',
              color: activeTab === 'generator' ? '#000' : 'var(--text-secondary)',
              fontWeight: '700', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem'
            }}
          >
            <Palette size={15} /> Criador & Design
          </button>
          <button 
            onClick={() => setActiveTab('analytics')}
            style={{
              padding: '0.4rem 0.9rem', borderRadius: '6px', border: 'none',
              background: activeTab === 'analytics' ? 'var(--accent)' : 'transparent',
              color: activeTab === 'analytics' ? '#000' : 'var(--text-secondary)',
              fontWeight: '700', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem'
            }}
          >
            <BarChart3 size={15} /> Relatórios ({totalScans})
          </button>
          <button 
            onClick={() => setActiveTab('links')}
            style={{
              padding: '0.4rem 0.9rem', borderRadius: '6px', border: 'none',
              background: activeTab === 'links' ? 'var(--accent)' : 'transparent',
              color: activeTab === 'links' ? '#000' : 'var(--text-secondary)',
              fontWeight: '700', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem'
            }}
          >
            <LinkIcon size={15} /> Links ({activeCodesCount})
          </button>
        </div>

        <button 
          onClick={() => onOpenIA && onOpenIA('Gerador de QR Code')}
          className="btn-primary outline" 
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', borderColor: 'var(--accent)', color: 'var(--accent)', padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
        >
          <Sparkles size={15} /> IA Copywriter
        </button>
      </div>

      {/* VISTA 1: CRIADOR & DESIGNER DE QR CODE */}
      {activeTab === 'generator' && (
        <>
          {/* ABAS DE TIPO DE CONTEÚDO */}
          <div className="section-card liquid-glass" style={{ padding: '0.4rem 0.8rem', overflowX: 'auto' }}>
            <div style={{ display: 'flex', gap: '0.4rem', minWidth: '850px' }}>
              {[
                { id: 'url', label: 'URL / SITE', icon: <LinkIcon size={14} /> },
                { id: 'text', label: 'TEXTO LIBERADO', icon: <FileText size={14} /> },
                { id: 'email', label: 'E-MAIL DIRETO', icon: <Mail size={14} /> },
                { id: 'phone', label: 'LIGAÇÃO TEL', icon: <Smartphone size={14} /> },
                { id: 'sms', label: 'MENSAGEM SMS', icon: <MessageCircle size={14} /> },
                { id: 'vcard', label: 'CARTÃO VCARD', icon: <Contact size={14} /> },
                { id: 'wifi', label: 'WIFI AUTOMÁTICO', icon: <Wifi size={14} /> },
                { id: 'pix', label: 'CHAVE PIX', icon: <DollarSign size={14} /> },
                { id: 'bitcoin', label: 'BITCOIN / CRIPTO', icon: <Bitcoin size={14} /> }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => { setContentType(tab.id); handleGenerate(); }}
                  style={{
                    padding: '0.4rem 0.8rem', borderRadius: '6px', border: 'none',
                    background: contentType === tab.id ? 'var(--accent)' : 'transparent',
                    color: contentType === tab.id ? '#000' : 'var(--text-secondary)',
                    fontWeight: '700', fontSize: '0.78rem', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '0.4rem'
                  }}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* GRID PRINCIPAL DE CONFIGURAÇÃO */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 370px', gap: '0.8rem', flex: 1, overflow: 'hidden' }}>
            
            {/* PAINEL ESQUERDO: SEÇÕES SANFONA (SCROLLAVEL E COMPACTO) */}
            <div className="section-card liquid-glass" style={{ padding: '0.9rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.8rem', paddingBottom: '2.5rem' }}>
              
              {/* NOME DA CAMPANHA E SELEÇÃO DE MODO: DINÂMICO VS ESTÁTICO */}
              <div style={{ padding: '0.9rem', background: 'rgba(0,240,255,0.04)', border: '1px solid rgba(0,240,255,0.18)', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <div>
                  <label style={labelStyle}>Nome de Identificação da Campanha / Materiais *</label>
                  <input type="text" value={qrName} onChange={(e) => setQrName(e.target.value)} style={inputStyle} placeholder="Ex: Cartaz Zona Leste - Modelo 01" />
                </div>

                {/* TIPO DE QR CODE: DINÂMICO VS ESTÁTICO */}
                <div>
                  <label style={labelStyle}>Tipo de QR Code *</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <button
                      type="button"
                      onClick={() => setIsDynamic(true)}
                      style={{
                        padding: '0.85rem 0.75rem',
                        borderRadius: '12px',
                        border: isDynamic ? '2px solid var(--accent)' : '1px solid rgba(255,255,255,0.08)',
                        background: isDynamic ? 'linear-gradient(135deg, rgba(0, 240, 255, 0.16) 0%, rgba(0, 160, 255, 0.05) 100%)' : 'rgba(0,0,0,0.3)',
                        color: isDynamic ? 'var(--accent)' : 'var(--text-secondary)',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.3rem',
                        boxShadow: isDynamic ? '0 0 20px rgba(0, 240, 255, 0.25)' : 'none',
                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontWeight: '800', fontSize: '0.85rem' }}>
                        <Zap size={16} color={isDynamic ? 'var(--accent)' : '#aaa'} /> QR Dinâmico
                      </div>
                      <span style={{ fontSize: '0.68rem', color: isDynamic ? '#e2e8f0' : 'var(--text-muted)', lineHeight: '1.3' }}>
                        Rastreável com Analytics. Altere o destino a qualquer momento!
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsDynamic(false)}
                      style={{
                        padding: '0.85rem 0.75rem',
                        borderRadius: '12px',
                        border: !isDynamic ? '2px solid #10b981' : '1px solid rgba(255,255,255,0.08)',
                        background: !isDynamic ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.16) 0%, rgba(5, 150, 105, 0.05) 100%)' : 'rgba(0,0,0,0.3)',
                        color: !isDynamic ? '#10b981' : 'var(--text-secondary)',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.3rem',
                        boxShadow: !isDynamic ? '0 0 20px rgba(16, 185, 129, 0.25)' : 'none',
                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontWeight: '800', fontSize: '0.85rem' }}>
                        <Shield size={16} color={!isDynamic ? '#10b981' : '#aaa'} /> QR Estático
                      </div>
                      <span style={{ fontSize: '0.68rem', color: !isDynamic ? '#e2e8f0' : 'var(--text-muted)', lineHeight: '1.3' }}>
                        Direto no código. Não depende de servidor e não expira.
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 1. CONTEÚDO DO QR CODE */}
              <div style={accordionBoxStyle}>
                <div style={accordionHeaderStyle} onClick={() => setActiveAccordion(activeAccordion === 'content' ? '' : 'content')}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: '700', color: '#fff', fontSize: '0.85rem' }}>
                    <Globe size={16} color="var(--accent)" /> 1. CONTEÚDO DO QR CODE
                  </div>
                  {activeAccordion === 'content' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>

                {activeAccordion === 'content' && (
                  <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {contentType === 'url' && (
                      <div>
                        <label style={labelStyle}>URL de Destino *</label>
                        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} style={inputStyle} placeholder="https://eleger.app.br" />
                      </div>
                    )}

                    {contentType === 'text' && (
                      <div>
                        <label style={labelStyle}>Texto Informativo / Proposta *</label>
                        <textarea value={text} onChange={(e) => setText(e.target.value)} style={{ ...inputStyle, minHeight: '70px' }} />
                      </div>
                    )}

                    {contentType === 'pix' && (
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                        <div>
                          <label style={labelStyle}>Chave Pix *</label>
                          <input type="text" value={pix.key} onChange={(e) => setPix({...pix, key: e.target.value})} style={inputStyle} />
                        </div>
                        <div>
                          <label style={labelStyle}>Beneficiário / Nome *</label>
                          <input type="text" value={pix.name} onChange={(e) => setPix({...pix, name: e.target.value})} style={inputStyle} />
                        </div>
                      </div>
                    )}

                    {contentType === 'wifi' && (
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                        <div>
                          <label style={labelStyle}>Nome da Rede Wi-Fi (SSID) *</label>
                          <input type="text" value={wifi.ssid} onChange={(e) => setWifi({...wifi, ssid: e.target.value})} style={inputStyle} />
                        </div>
                        <div>
                          <label style={labelStyle}>Senha do Wi-Fi</label>
                          <input type="text" value={wifi.pass} onChange={(e) => setWifi({...wifi, pass: e.target.value})} style={inputStyle} />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* 2. DEFINIÇÃO DE CORES & GRADIENTES */}
              <div style={accordionBoxStyle}>
                <div style={accordionHeaderStyle} onClick={() => setActiveAccordion(activeAccordion === 'colors' ? '' : 'colors')}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: '700', color: '#fff', fontSize: '0.85rem' }}>
                    <Palette size={16} color="var(--accent)" /> 2. DEFINIÇÃO DE CORES & GRADIENTES
                  </div>
                  {activeAccordion === 'colors' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>

                {activeAccordion === 'colors' && (
                  <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                      <div>
                        <label style={labelStyle}>Cor da Arte / QR Code</label>
                        <div style={{ display: 'flex', gap: '0.4rem' }}>
                          <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} style={colorPickerStyle} />
                          <input type="text" value={fgColor} onChange={(e) => setFgColor(e.target.value)} style={inputStyle} />
                        </div>
                      </div>

                      <div>
                        <label style={labelStyle}>Cor do Fundo (Padrão: #FFFFFF)</label>
                        <div style={{ display: 'flex', gap: '0.4rem' }}>
                          <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} style={colorPickerStyle} />
                          <input type="text" value={bgColor} onChange={(e) => setBgColor(e.target.value)} style={inputStyle} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. MARCA / LOGO CENTRAL ESTILO QRCODE MONKEY */}
              <div style={accordionBoxStyle}>
                <div style={accordionHeaderStyle} onClick={() => setActiveAccordion(activeAccordion === 'logo' ? '' : 'logo')}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: '700', color: '#fff', fontSize: '0.85rem' }}>
                    <ImageIcon size={16} color="var(--accent)" /> 3. MARCA / LOGO CENTRAL
                  </div>
                  {activeAccordion === 'logo' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>

                {activeAccordion === 'logo' && (
                  <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer' }}>
                      <input type="checkbox" checked={removeBgBehindLogo} onChange={(e) => setRemoveBgBehindLogo(e.target.checked)} style={{ accentColor: 'var(--accent)' }} />
                      Remover fundo da matriz atrás da logo (Remove Background Behind Logo)
                    </label>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                      <label style={{ padding: '0.6rem 1rem', background: 'var(--accent)', color: '#000', fontWeight: 'bold', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem' }}>
                        <Upload size={15} /> Enviar Marca Própria (.PNG / .SVG)
                        <input type="file" accept="image/*" onChange={handleLogoUpload} style={{ display: 'none' }} />
                      </label>
                      {customLogoUrl && <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 'bold' }}>✓ Marca Carregada</span>}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.6rem' }}>
                      {LOGO_PRESETS.map((item) => (
                        <button 
                          key={item.id} 
                          onClick={() => setSelectedLogo(item.id)} 
                          style={{ 
                            padding: '0.6rem 0.3rem', borderRadius: '10px', 
                            border: selectedLogo === item.id ? '2px solid var(--accent)' : '1px solid rgba(255,255,255,0.1)', 
                            background: 'rgba(0,0,0,0.4)', cursor: 'pointer', 
                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem'
                          }}
                        >
                          <div style={{
                            width: '36px', height: '36px', borderRadius: '50%',
                            background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center'
                          }}>
                            {item.svg ? <div dangerouslySetInnerHTML={{ __html: item.svg }} /> : <span style={{ color: '#fff', fontSize: '10px', fontWeight: 'bold' }}>OFF</span>}
                          </div>
                          <span style={{ color: selectedLogo === item.id ? 'var(--accent)' : '#ccc', fontSize: '0.68rem', fontWeight: 'bold' }}>
                            {item.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 4. CUSTOMIZAR DESIGN DE FORMAS (BODY SHAPE, EYE FRAME, EYE BALL) ESTILO QRCODE MONKEY */}
              <div style={accordionBoxStyle}>
                <div style={accordionHeaderStyle} onClick={() => setActiveAccordion(activeAccordion === 'shapes' ? '' : 'shapes')}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: '700', color: '#fff', fontSize: '0.85rem' }}>
                    <Layout size={16} color="var(--accent)" /> 4. DESIGN DE FORMAS & OLHOS (QRCODE MONKEY)
                  </div>
                  {activeAccordion === 'shapes' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>

                {activeAccordion === 'shapes' && (
                  <div style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
                    
                    {/* BODY SHAPE */}
                    <div>
                      <label style={labelStyle}>1. Formato dos Módulos do Corpo (Body Shape):</label>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(105px, 1fr))', gap: '0.65rem', marginTop: '0.6rem' }}>
                        {BODY_SHAPES.map(item => {
                          const isSel = bodyShape === item.id;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => setBodyShape(item.id)}
                              style={{
                                padding: '0.75rem 0.4rem', borderRadius: '12px',
                                border: isSel ? '2px solid var(--accent)' : '1px solid rgba(255,255,255,0.12)',
                                background: isSel ? 'rgba(0, 240, 255, 0.15)' : 'rgba(15, 23, 42, 0.65)',
                                color: isSel ? 'var(--accent)' : '#e2e8f0',
                                fontSize: '0.74rem', fontWeight: '700', cursor: 'pointer',
                                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.45rem',
                                boxShadow: isSel ? '0 0 16px rgba(0, 240, 255, 0.28)' : 'none',
                                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                              }}
                            >
                              <div 
                                style={{ width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', filter: isSel ? 'drop-shadow(0 0 6px var(--accent))' : 'none' }}
                                dangerouslySetInnerHTML={{ __html: item.svg }} 
                              />
                              <span style={{ textAlign: 'center', lineHeight: '1.15' }}>{item.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* EYE FRAME SHAPE */}
                    <div>
                      <label style={labelStyle}>2. Moldura Externa dos Olhos (Eye Frame Shape):</label>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(105px, 1fr))', gap: '0.65rem', marginTop: '0.6rem' }}>
                        {EYE_FRAME_SHAPES.map(item => {
                          const isSel = eyeFrameShape === item.id;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => setEyeFrameShape(item.id)}
                              style={{
                                padding: '0.75rem 0.4rem', borderRadius: '12px',
                                border: isSel ? '2px solid var(--accent)' : '1px solid rgba(255,255,255,0.12)',
                                background: isSel ? 'rgba(0, 240, 255, 0.15)' : 'rgba(15, 23, 42, 0.65)',
                                color: isSel ? 'var(--accent)' : '#e2e8f0',
                                fontSize: '0.74rem', fontWeight: '700', cursor: 'pointer',
                                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.45rem',
                                boxShadow: isSel ? '0 0 16px rgba(0, 240, 255, 0.28)' : 'none',
                                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                              }}
                            >
                              <div 
                                style={{ width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', filter: isSel ? 'drop-shadow(0 0 6px var(--accent))' : 'none' }}
                                dangerouslySetInnerHTML={{ __html: item.svg }} 
                              />
                              <span style={{ textAlign: 'center', lineHeight: '1.15' }}>{item.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* EYE BALL SHAPE */}
                    <div>
                      <label style={labelStyle}>3. Centro Interno dos Olhos (Eye Ball Shape):</label>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(105px, 1fr))', gap: '0.65rem', marginTop: '0.6rem' }}>
                        {EYE_BALL_SHAPES.map(item => {
                          const isSel = eyeBallShape === item.id;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => setEyeBallShape(item.id)}
                              style={{
                                padding: '0.75rem 0.4rem', borderRadius: '12px',
                                border: isSel ? '2px solid var(--accent)' : '1px solid rgba(255,255,255,0.12)',
                                background: isSel ? 'rgba(0, 240, 255, 0.15)' : 'rgba(15, 23, 42, 0.65)',
                                color: isSel ? 'var(--accent)' : '#e2e8f0',
                                fontSize: '0.74rem', fontWeight: '700', cursor: 'pointer',
                                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.45rem',
                                boxShadow: isSel ? '0 0 16px rgba(0, 240, 255, 0.28)' : 'none',
                                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                              }}
                            >
                              <div 
                                style={{ width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', filter: isSel ? 'drop-shadow(0 0 6px var(--accent))' : 'none' }}
                                dangerouslySetInnerHTML={{ __html: item.svg }} 
                              />
                              <span style={{ textAlign: 'center', lineHeight: '1.15' }}>{item.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                  </div>
                )}
              </div>

            </div>

            {/* PAINEL DIREITO: PREVIEW MATRIZ REAL ELEGANTE E MODERNA */}
            <div className="section-card liquid-glass" style={{ padding: '1.2rem 1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', textAlign: 'center', gap: '0.8rem' }}>
              
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.9rem' }}>
                
                {/* HEADLINE PREVIEW CARD */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent)', fontSize: '0.78rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  <Eye size={15} /> Pré-Visualização HD
                </div>

                {/* PREVIEW DA MATRIZ QR CODE COM MOLDURA ELEGANTE E OVERLAYS PRECISOS */}
                <div style={{ 
                  background: bgColor, 
                  padding: '1.1rem', 
                  borderRadius: '20px', 
                  border: `4px solid ${fgColor}`, 
                  boxShadow: '0 15px 35px rgba(0,0,0,0.5), 0 0 25px rgba(0, 240, 255, 0.15)', 
                  position: 'relative',
                  transition: 'all 0.3s ease'
                }}>
                  <img 
                    src={qrApiUrl} 
                    alt="QR Code Escaneável Real"
                    style={{ 
                      width: '185px', height: '185px', display: 'block', 
                      borderRadius: bodyShape === 'dot' || bodyShape === 'circle' ? '12px' : '4px',
                      filter: bodyShape === 'dot' ? 'contrast(150%)' : 'none'
                    }}
                  />

                  {/* OVERLAY DA LOGO OFICIAL SELECIONADA */}
                  {selectedLogo !== 'none' && (
                    <div style={{
                      position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                      width: '46px', height: '46px', 
                      background: removeBgBehindLogo ? bgColor : 'transparent', 
                      borderRadius: '12px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 6px 18px rgba(0,0,0,0.35)', 
                      border: removeBgBehindLogo ? `3px solid ${bgColor}` : 'none'
                    }}>
                      {selectedLogo === 'custom' && customLogoUrl ? (
                        <img src={customLogoUrl} style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
                      ) : activePresetLogo && activePresetLogo.svg ? (
                        <div style={{
                          width: '36px', height: '36px', borderRadius: '50%',
                          background: activePresetLogo.bg, display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }} dangerouslySetInnerHTML={{ __html: activePresetLogo.svg }} />
                      ) : null}
                    </div>
                  )}
                </div>

                {/* BADGE DE DESIGN SELECIONADO */}
                <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', background: 'rgba(0,0,0,0.4)', padding: '0.3rem 0.6rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.06)' }}>
                  🎨 <strong>{BODY_SHAPES.find(b => b.id === bodyShape)?.label}</strong> + <strong>{currentEyeFrame?.label}</strong>
                </div>

                <div style={{ padding: '0.35rem 0.75rem', background: 'rgba(16,185,129,0.1)', border: '1px solid #10b981', borderRadius: '8px', color: '#10b981', fontWeight: 'bold', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CheckCircle2 size={14} /> 100% Escaneável por Celular / Leitor
                </div>

                <div style={{ width: '100%' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Resolução Final: {resolution} x {resolution} Px</span>
                  <input type="range" min="500" max="3000" step="100" value={resolution} onChange={(e) => setResolution(Number(e.target.value))} style={{ width: '100%', accentColor: '#10b981' }} />
                </div>
              </div>

              {/* GRUPO DE BOTÕES DE SALVAR & DOWNLOAD COM DESIGN ULTRA-MODERNO */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', width: '100%', marginTop: '0.6rem' }}>
                
                <button 
                  onClick={handleSaveQrCode}
                  style={{ 
                    padding: '0.78rem 1rem', 
                    background: isDynamic 
                      ? 'linear-gradient(135deg, #a3e635 0%, #84cc16 100%)' 
                      : 'linear-gradient(135deg, #10b981 0%, #059669 100%)', 
                    color: isDynamic ? '#0f172a' : '#ffffff', 
                    border: 'none', 
                    borderRadius: '12px', 
                    fontWeight: '800', 
                    fontSize: '0.88rem', 
                    cursor: 'pointer', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: '0.5rem', 
                    letterSpacing: '0.3px',
                    boxShadow: isDynamic 
                      ? '0 8px 22px rgba(163, 230, 53, 0.4), inset 0 1px 1px rgba(255,255,255,0.4)' 
                      : '0 8px 22px rgba(16, 185, 129, 0.4), inset 0 1px 1px rgba(255,255,255,0.4)',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  {isDynamic ? (
                    <><Zap size={18} /> Salvar & Ativar Rastreio Dinâmico</>
                  ) : (
                    <><Shield size={18} /> Salvar QR Code Estático</>
                  )}
                </button>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                  <button 
                    onClick={downloadPNG} 
                    style={{ 
                      padding: '0.65rem 0.5rem', 
                      background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)', 
                      color: '#ffffff', 
                      border: 'none', 
                      borderRadius: '10px', 
                      fontWeight: '800', 
                      fontSize: '0.8rem', 
                      cursor: 'pointer', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      gap: '0.4rem',
                      boxShadow: '0 6px 16px rgba(14, 165, 233, 0.35)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Download size={15} /> Download PNG
                  </button>

                  <button 
                    onClick={downloadSVG} 
                    style={{ 
                      padding: '0.65rem 0.5rem', 
                      background: 'rgba(14, 165, 233, 0.15)', 
                      border: '1.5px solid #0ea5e9', 
                      color: '#38bdf8', 
                      borderRadius: '10px', 
                      fontWeight: '800', 
                      fontSize: '0.8rem', 
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem',
                      boxShadow: '0 4px 12px rgba(14, 165, 233, 0.15)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Code size={15} /> Vetor .SVG
                  </button>
                </div>

                <button 
                  onClick={downloadPDF} 
                  style={{ 
                    padding: '0.5rem 0.8rem',
                    background: 'rgba(255, 255, 255, 0.05)', 
                    border: '1px solid rgba(255, 255, 255, 0.12)', 
                    color: '#94a3b8', 
                    borderRadius: '8px',
                    fontSize: '0.74rem', 
                    fontWeight: '600',
                    cursor: 'pointer', 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    transition: 'all 0.2s ease',
                    marginTop: '0.2rem'
                  }}
                >
                  <Printer size={13} color="#94a3b8" /> Exportar PDF para Gráfica (Com Margem de Corte)
                </button>
              </div>

            </div>

          </div>
        </>
      )}

      {/* VISTA 2: RELATÓRIOS & METRICAS DE CLIQUES */}
      {activeTab === 'analytics' && (
        <div className="section-card liquid-glass" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', overflowY: 'auto' }}>
          
          {/* CARDS DE KPIS */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            <div style={{ padding: '1.2rem', background: 'rgba(0,240,255,0.05)', border: '1px solid rgba(0,240,255,0.2)', borderRadius: '12px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '600' }}>TOTAL DE ESCANEAMENTOS GLOBAIS</span>
              <h3 style={{ fontSize: '2.4rem', fontWeight: '800', color: 'var(--accent)', marginTop: '0.4rem' }}>{totalScans}</h3>
              <span style={{ fontSize: '0.75rem', color: '#10b981' }}>↑ +24.8% este mês</span>
            </div>

            <div style={{ padding: '1.2rem', background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '12px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '600' }}>QR CODES ATIVOS</span>
              <h3 style={{ fontSize: '2.4rem', fontWeight: '800', color: '#10b981', marginTop: '0.4rem' }}>{activeCodesCount}</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Campanhas com Rastreio 302</span>
            </div>

            <div style={{ padding: '1.2rem', background: 'rgba(168,85,247,0.05)', border: '1px solid rgba(168,85,247,0.2)', borderRadius: '12px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '600' }}>DISPOSITIVOS MOBILE</span>
              <h3 style={{ fontSize: '2.4rem', fontWeight: '800', color: '#a855f7', marginTop: '0.4rem' }}>96.4%</h3>
              <span style={{ fontSize: '0.75rem', color: '#10b981' }}>Smartphones iOS & Android</span>
            </div>
          </div>

          {/* TABELA DE CAMPANHAS E CONTAGEM DE CLIQUES */}
          <div style={{ border: '1px solid rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.3)', fontWeight: 'bold', fontSize: '0.9rem', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Activity size={18} color="var(--accent)" /> Desempenho em Tempo Real por Campanha
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Auto-sync ativo</span>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.02)', color: 'var(--text-muted)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <th style={{ padding: '0.8rem 1rem' }}>IDENTIFICAÇÃO</th>
                  <th style={{ padding: '0.8rem 1rem' }}>TIPO</th>
                  <th style={{ padding: '0.8rem 1rem' }}>LINK DINÂMICO</th>
                  <th style={{ padding: '0.8rem 1rem' }}>ESCANEAMENTOS</th>
                  <th style={{ padding: '0.8rem 1rem', textAlign: 'right' }}>AÇÕES DE TESTE</th>
                </tr>
              </thead>
              <tbody>
                {savedQrs.map((qr) => (
                  <tr key={qr.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '0.9rem 1rem', fontWeight: 'bold', color: '#fff' }}>
                      {qr.name}
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>{qr.content}</div>
                    </td>
                    <td style={{ padding: '0.9rem 1rem' }}>
                      <span style={{ padding: '0.2rem 0.6rem', borderRadius: '4px', background: 'rgba(0,240,255,0.1)', color: 'var(--accent)', fontSize: '0.75rem', fontWeight: 'bold' }}>
                        {qr.contentType.toUpperCase()}
                      </span>
                    </td>
                    <td style={{ padding: '0.9rem 1rem', color: 'var(--accent)', fontFamily: 'monospace', fontSize: '0.8rem' }}>
                      /s/{qr.id}
                    </td>
                    <td style={{ padding: '0.9rem 1rem', fontSize: '1.1rem', fontWeight: '800', color: '#10b981' }}>
                      {qr.scans} cliques
                    </td>
                    <td style={{ padding: '0.9rem 1rem', textAlign: 'right', display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                      <button 
                        onClick={() => handleCopyTrackingLink(qr.id)}
                        style={{ padding: '0.4rem 0.7rem', background: 'rgba(0,240,255,0.1)', border: '1px solid var(--accent)', color: 'var(--accent)', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                      >
                        {copiedId === qr.id ? <Check size={14} /> : <Copy size={14} />} Copiar Link
                      </button>
                      <button 
                        onClick={() => handleSimulateScan(qr.id)}
                        style={{ padding: '0.4rem 0.7rem', background: 'rgba(16,185,129,0.2)', border: '1px solid #10b981', color: '#10b981', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold' }}
                      >
                        + Simular Clique
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* VISTA 3: GERENCIADOR DE LINKS DINÂMICOS */}
      {activeTab === 'links' && (
        <div className="section-card liquid-glass" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', overflowY: 'auto' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#fff' }}>Gerenciador de Redirecionamento Inteligente de Links</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Altere a URL de destino de qualquer QR Code impresso em tempo real. O cidadão que escanear o papel antigo será automaticamente guiado para a nova página!
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {savedQrs.map((qr) => (
              <div key={qr.id} style={{ padding: '1rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{ fontWeight: 'bold', color: '#fff', fontSize: '1rem' }}>{qr.name}</span>
                    <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', background: 'rgba(16,185,129,0.2)', color: '#10b981', borderRadius: '4px', fontWeight: 'bold' }}>ATIVO (302 REDIRECT)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--accent)' }}>
                    <LinkIcon size={14} /> Link Rastreado: <code>{typeof window !== 'undefined' ? window.location.origin : ''}/s/{qr.id}</code>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Destino Atual: <strong style={{ color: '#fff' }}>{qr.content}</strong></div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    onClick={() => {
                      const newUrl = prompt('Digite a nova URL de destino para este QR Code:', qr.content);
                      if (newUrl) {
                        const updated = savedQrs.map(q => q.id === qr.id ? { ...q, content: newUrl } : q);
                        updateSavedQrsState(updated);
                        showToast('✓ Destino da URL atualizado em tempo real!');
                      }
                    }}
                    style={{ padding: '0.55rem 1rem', background: 'var(--accent)', color: '#000', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                  >
                    <Edit3 size={14} /> Editar Destino
                  </button>

                  <button 
                    onClick={() => handleDeleteQr(qr.id)}
                    style={{ padding: '0.55rem 0.8rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '0.65rem 0.8rem',
  background: 'rgba(0,0,0,0.3)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '0.85rem',
  outline: 'none',
};

const labelStyle = {
  display: 'block',
  fontSize: '0.8rem',
  fontWeight: '600',
  color: 'var(--text-muted)',
  marginBottom: '0.4rem'
};

const accordionBoxStyle = {
  background: 'rgba(0,0,0,0.2)',
  border: '1px solid rgba(255,255,255,0.05)',
  borderRadius: '10px',
  overflow: 'hidden'
};

const accordionHeaderStyle = {
  padding: '0.8rem 1rem',
  background: 'rgba(255,255,255,0.02)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer',
  userSelect: 'none'
};

const colorPickerStyle = {
  width: '36px',
  height: '36px',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer'
};
