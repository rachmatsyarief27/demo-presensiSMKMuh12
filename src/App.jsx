import React, { useState, useEffect } from 'react';
import { 
  Menu, MenuItem, Search, BarChart2, Users, Clock, Settings,
  BookOpen, CreditCard, School, ArrowLeft, Plus, X, CheckCircle, Pencil, Trash2, Download, ShieldCheck, Printer, Tv, 
} from 'lucide-react';
import * as XLSX from 'xlsx';

// --- TAMBAHAN IMPORT SUPABASE ---
import { supabase } from './supabaseClient';

export default function DashboardKehadiran() {
  const [adminCredential, setAdminCredential] = useState(() => {
    const saved = localStorage.getItem('adminCredential');
    return saved ? JSON.parse(saved) : { username: 'admin', password: 'admin123' };
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('isAdminLoggedIn') === 'true';
  });

  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('absen-sekolah'); 

  // State Pengaturan Audio Kustom dengan localStorage
  const [pengaturanAudio, setPengaturanAudio] = useState(() => {
    const saved = localStorage.getItem('pengaturanAudio');
    return saved ? JSON.parse(saved) : { aktif: true, berhasil: '', pulang: '', terlambat: '', tidakDikenal: '' };
  });

  useEffect(() => {
    localStorage.setItem('pengaturanAudio', JSON.stringify(pengaturanAudio));
  }, [pengaturanAudio]);

  // ================= STATE TAHUN PELAJARAN =================
  const [tahunPelajaranAktif, setTahunPelajaranAktif] = useState(() => {
    return localStorage.getItem('tahunPelajaranAktif') || '2026/2027';
  });

  const [daftarTahunPelajaran, setDaftarTahunPelajaran] = useState(() => {
    const saved = localStorage.getItem('daftarTahunPelajaran');
    return saved ? JSON.parse(saved) : ['2025/2026', '2026/2027', '2027/2028', '2028/2029'];
  });

  // ================= STATE DARK MODE =================
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('isDarkMode');
    return saved ? JSON.parse(saved) : false;
  });

  // ================= STATE FOTO PROFIL ADMIN =================
  const [adminPhoto, setAdminPhoto] = useState(() => {
    return localStorage.getItem('adminPhoto') || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin';
  });

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [tempPhotoInput, setTempPhotoInput] = useState(adminPhoto);

  // ================= STATE MENU HP / RESPONSIF =================
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ================= STATE DENGAN LOCAL STORAGE =================
  const [dataGuru, setDataGuru] = useState(() => {
    const saved = localStorage.getItem('dataGuru');
    return saved ? JSON.parse(saved) : [];
  });

  const [dataSiswa, setDataSiswa] = useState(() => {
    const saved = localStorage.getItem('dataSiswa');
    return saved ? JSON.parse(saved) : [];
  });

  const [jadwalPiket, setJadwalPiket] = useState(() => {
    const saved = localStorage.getItem('jadwalPiket');
    return saved ? JSON.parse(saved) : [
      { id: 1, hari: 'Senin', petugas1: 'Belum diatur', petugas2: 'Belum diatur' },
      { id: 2, hari: 'Selasa', petugas1: 'Belum diatur', petugas2: 'Belum diatur' },
      { id: 3, hari: 'Rabu', petugas1: 'Belum diatur', petugas2: 'Belum diatur' },
      { id: 4, hari: 'Kamis', petugas1: 'Belum diatur', petugas2: 'Belum diatur' },
      { id: 5, hari: 'Jumat', petugas1: 'Belum diatur', petugas2: 'Belum diatur' },
      { id: 6, hari: 'Sabtu', petugas1: 'Belum diatur', petugas2: 'Belum diatur' }
    ];
  });

  const [pengaturanJam, setPengaturanJam] = useState(() => {
    const saved = localStorage.getItem('pengaturanJam');
    return saved ? JSON.parse(saved) : {
      modeAktif: 'Pagi', 
      pagi: { jamMasuk: '07:00', ambangTerlambat: '07:15', jamPulang: '13:00' },
      siang: { jamMasuk: '13:00', ambangTerlambat: '13:15', jamPulang: '17:30' },
      fullDay: { jamMasuk: '07:00', ambangTerlambat: '07:15', jamPulang: '15:30' }
    };
  });

  const [infoSekolah, setInfoSekolah] = useState(() => {
    const saved = localStorage.getItem('infoSekolah');
    return saved ? JSON.parse(saved) : { 
      nama: '', 
      alamat: '',
      logo: null,
      pengumuman: '. Budayakan 5S (Senyum, Sapa, Salam, Santun, Sopan). Harap menggunakan atribut seragam lengkap!' 
    };
  });

  const [logKehadiran, setLogKehadiran] = useState(() => {
    const saved = localStorage.getItem('logKehadiran');
    return saved ? JSON.parse(saved) : [];
  });

  const [dataPelanggaran, setDataPelanggaran] = useState(() => {
    const saved = localStorage.getItem('dataPelanggaran');
    return saved ? JSON.parse(saved) : [];
  });

  const [dataPerizinan, setDataPerizinan] = useState(() => {
    const saved = localStorage.getItem('dataPerizinan');
    return saved ? JSON.parse(saved) : [];
  });

  const [arsipAbsensi, setArsipAbsensi] = useState(() => {
    const saved = localStorage.getItem('arsipAbsensi');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('adminCredential', JSON.stringify(adminCredential));
    localStorage.setItem('isAdminLoggedIn', isAdminLoggedIn);
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
    localStorage.setItem('adminPhoto', adminPhoto);
    localStorage.setItem('tahunPelajaranAktif', tahunPelajaranAktif);
    localStorage.setItem('daftarTahunPelajaran', JSON.stringify(daftarTahunPelajaran));
    localStorage.setItem('dataGuru', JSON.stringify(dataGuru));
    localStorage.setItem('dataSiswa', JSON.stringify(dataSiswa));
    localStorage.setItem('jadwalPiket', JSON.stringify(jadwalPiket));
    localStorage.setItem('pengaturanJam', JSON.stringify(pengaturanJam));
    localStorage.setItem('infoSekolah', JSON.stringify(infoSekolah));
    localStorage.setItem('logKehadiran', JSON.stringify(logKehadiran));
    localStorage.setItem('dataPelanggaran', JSON.stringify(dataPelanggaran));
    localStorage.setItem('dataPerizinan', JSON.stringify(dataPerizinan));
    localStorage.setItem('arsipAbsensi', JSON.stringify(arsipAbsensi));
  }, [adminCredential, isAdminLoggedIn, isDarkMode, adminPhoto, tahunPelajaranAktif, daftarTahunPelajaran, dataGuru, dataSiswa, jadwalPiket, pengaturanJam, infoSekolah, logKehadiran, dataPelanggaran, dataPerizinan, arsipAbsensi]);

  // ================= KODE PENGHUBUNG SUPABASE =================
  useEffect(() => {
    const ambilDataDariSupabase = async () => {
      const { data: guruData } = await supabase.from('guru').select('*');
      if (guruData && guruData.length > 0) setDataGuru(guruData);

      const { data: siswaData } = await supabase.from('siswa').select('*');
      if (siswaData && siswaData.length > 0) setDataSiswa(siswaData);

      const { data: logData } = await supabase.from('log_kehadiran').select('*');
      if (logData && logData.length > 0) setLogKehadiran(logData);

      // --- PENGATURAN SEKOLAH ---
      const { data: pengaturanData } = await supabase.from('pengaturan').select('*');
      if (pengaturanData && pengaturanData.length > 0) {
        setInfoSekolah({
          nama: pengaturanData[0].nama || '',
          alamat: pengaturanData[0].alamat || '',
          logo: pengaturanData[0].logo || null,
          pengumuman: pengaturanData[0].pengumuman || ''
        });
      }

      // --- TAMBAHAN DATA PENDUKUNG (PELANGGARAN, PERIZINAN, PIKET, JAM) ---
      const { data: pelanggaranData } = await supabase.from('data_pelanggaran').select('*');
      if (pelanggaranData) setDataPelanggaran(pelanggaranData);

      const { data: perizinanData } = await supabase.from('data_perizinan').select('*');
      if (perizinanData) setDataPerizinan(perizinanData);

      const { data: piketData } = await supabase.from('jadwal_piket').select('*');
      if (piketData && piketData.length > 0) setJadwalPiket(piketData);

      const { data: jamData } = await supabase.from('pengaturan_jam').select('*');
      if (jamData && jamData.length > 0) {
        setPengaturanJam(jamData[0]);
      }
      // ------------------------------------------------------------------
    };

    ambilDataDariSupabase();
  }, []);
  // =======================================================================

  const handleLogin = (e) => {
    e.preventDefault();
    if (usernameInput === adminCredential.username && passwordInput === adminCredential.password) {
      setIsAdminLoggedIn(true);
      setLoginError('');
      setUsernameInput('');
      setPasswordInput('');
    } else {
      setLoginError('Username atau Password salah!');
    }
  };

  const handleLogout = () => {
    if (window.confirm('Apakah Anda yakin ingin keluar dari dasbor admin?')) {
      setIsAdminLoggedIn(false);
    }
  };

  const playBeep = (isSuccess = true) => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = isSuccess ? 'sine' : 'sawtooth';
      osc.frequency.value = isSuccess ? 800 : 300;
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + (isSuccess ? 0.15 : 0.4));
    } catch (e) {
      console.log('Audio error:', e);
    }
  };

  if (!isAdminLoggedIn) {
    return (
      <div className={`h-screen w-screen ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-900 text-gray-800'} flex items-center justify-center p-4 font-sans transition-colors`}>
        <div className={`${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-700'} w-full max-w-md rounded-3xl shadow-2xl p-8 space-y-6 border`}>
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-blue-600/30">
              <Lock size={32} />
            </div>
            <h1 className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'} tracking-wide`}>LOGIN ADMINISTRATOR</h1>
            
            {/* Nama dan Alamat Sekolah */}
            <div className="space-y-0.5 pt-1">
              <p className={`text-xs font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{infoSekolah.nama}</p>
              <p className={`text-[11px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{infoSekolah.alamat || 'Alamat sekolah belum diatur'}</p>
            </div>
          </div>

          {loginError && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-xs font-medium text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className={`block text-xs font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-500'} uppercase tracking-wider mb-1`}>Username</label>
              <div className="relative">
                <User className="absolute inset-y-0 left-3 my-auto h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  required
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  className={`w-full pl-11 pr-4 py-3 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'} border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600`}
                  placeholder="Masukkan username..."
                />
              </div>
            </div>

            <div>
              <label className={`block text-xs font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-500'} uppercase tracking-wider mb-1`}>Password</label>
              <div className="relative">
                <Lock className="absolute inset-y-0 left-3 my-auto h-5 w-5 text-slate-400" />
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className={`w-full pl-11 pr-4 py-3 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'} border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600`}
                  placeholder="Masukkan password..."
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition shadow-lg shadow-blue-600/30 cursor-pointer text-sm tracking-wide"
            >
              Masuk ke Dasbor
            </button>
          </form>

          <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-50 border text-slate-500'} p-4 rounded-xl text-center text-xs space-y-1`}>
            <p className={`font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>Akun Default:</p>
            <p>Username: <span className="font-mono font-bold text-blue-500">{adminCredential.username}</span> | Password: <span className="font-mono font-bold text-blue-500">{adminCredential.password}</span></p>
          </div>
        </div>
      </div>
    );
  }

  if (activeMenu === 'absen-rfid') {
    return (
      <LayarPenuhRFID 
        onBack={() => setActiveMenu('absen-sekolah')} 
        dataGuru={dataGuru}
        dataSiswa={dataSiswa}
        logKehadiran={logKehadiran}
        setLogKehadiran={setLogKehadiran}
        pengaturanJam={pengaturanJam}
        infoSekolah={infoSekolah}
        playBeep={playBeep}
        isDarkMode={isDarkMode}
        tahunPelajaranAktif={tahunPelajaranAktif}
      />
    );
  }

  if (activeMenu === 'mode-piket') {
    return (
      <ModePiketScreen 
        onBack={() => setActiveMenu('absen-sekolah')}
        dataGuru={dataGuru}
        dataSiswa={dataSiswa}
        logKehadiran={logKehadiran}
        setLogKehadiran={setLogKehadiran}
        pengaturanJam={pengaturanJam}
        infoSekolah={infoSekolah}
        playBeep={playBeep}
        jadwalPiket={jadwalPiket}
        isDarkMode={isDarkMode}
        tahunPelajaranAktif={tahunPelajaranAktif}
        pengaturanAudio={pengaturanAudio}
      />
    );
  }

  if (activeMenu === 'info-sekolah-tv') {
    return (
      <ModeInfoSekolahTV 
        onBack={() => setActiveMenu('absen-sekolah')}
        infoSekolah={infoSekolah}
        logKehadiran={logKehadiran}
        dataGuru={dataGuru}
        dataSiswa={dataSiswa}
        tahunPelajaranAktif={tahunPelajaranAktif}
      />
    );
  }

  const renderKontenUtama = () => {
    switch (activeMenu) {
      case 'absen-sekolah':
        return (
          <KontenAbsenSekolah 
            dataGuru={dataGuru} 
            dataSiswa={dataSiswa} 
            logKehadiran={logKehadiran} 
            setLogKehadiran={setLogKehadiran}
            pengaturanJam={pengaturanJam}
            infoSekolah={infoSekolah}
            playBeep={playBeep}
            arsipAbsensi={arsipAbsensi}
            setArsipAbsensi={setArsipAbsensi}
            isDarkMode={isDarkMode}
            tahunPelajaranAktif={tahunPelajaranAktif}
          />
        );
      case 'master-data':
        return (
          <KontenMasterData 
            dataGuru={dataGuru} setDataGuru={setDataGuru}
            dataSiswa={dataSiswa} setDataSiswa={setDataSiswa}
            logKehadiran={logKehadiran}
            isDarkMode={isDarkMode}
            tahunPelajaranAktif={tahunPelajaranAktif}
            daftarTahunPelajaran={daftarTahunPelajaran}
          />
        );
      case 'tahun-pelajaran':
        return (
          <KontenTahunPelajaran 
            tahunPelajaranAktif={tahunPelajaranAktif}
            setTahunPelajaranAktif={setTahunPelajaranAktif}
            daftarTahunPelajaran={daftarTahunPelajaran}
            setDaftarTahunPelajaran={setDaftarTahunPelajaran}
            dataSiswa={dataSiswa}
            setDataSiswa={setDataSiswa}
            logKehadiran={logKehadiran}
            setLogKehadiran={setLogKehadiran}
            dataPelanggaran={dataPelanggaran}
            setDataPelanggaran={setDataPelanggaran}
            dataPerizinan={dataPerizinan}
            setDataPerizinan={setDataPerizinan}
            arsipAbsensi={arsipAbsensi}
            setArsipAbsensi={setArsipAbsensi}
            isDarkMode={isDarkMode}
          />
        );
      case 'jadwal-piket':
        return (
          <KontenJadwalPiket 
            jadwalPiket={jadwalPiket}
            setJadwalPiket={setJadwalPiket}
            daftarGuru={dataGuru}
            isDarkMode={isDarkMode}
          />
        );
      case 'poin-disiplin':
        return (
          <KontenPoinDisiplin 
            dataSiswa={dataSiswa}
            dataPelanggaran={dataPelanggaran}
            setDataPelanggaran={setDataPelanggaran}
            isDarkMode={isDarkMode}
            tahunPelajaranAktif={tahunPelajaranAktif}
          />
        );
      case 'tren-disiplin':
        return (
          <KontenTrenDisiplin 
            dataPelanggaran={dataPelanggaran}
            dataSiswa={dataSiswa}
            isDarkMode={isDarkMode}
            tahunPelajaranAktif={tahunPelajaranAktif}
          />
        );
      case 'perizinan-siswa':
        return (
          <KontenPerizinanSiswa 
            dataSiswa={dataSiswa}
            dataGuru={dataGuru}
            dataPerizinan={dataPerizinan}
            setDataPerizinan={setDataPerizinan}
            infoSekolah={infoSekolah}
            isDarkMode={isDarkMode}
            tahunPelajaranAktif={tahunPelajaranAktif}
          />
        );
      case 'cetak-kartu':
        return <KontenCetakKartu dataGuru={dataGuru} dataSiswa={dataSiswa} infoSekolah={infoSekolah} isDarkMode={isDarkMode} tahunPelajaranAktif={tahunPelajaranAktif} />;
      case 'rekapitulasi':
        return <KontenRekapitulasi logKehadiran={logKehadiran} arsipAbsensi={arsipAbsensi} setArsipAbsensi={setArsipAbsensi} dataSiswa={dataSiswa} dataGuru={dataGuru} dataPelanggaran={dataPelanggaran} infoSekolah={infoSekolah} isDarkMode={isDarkMode} tahunPelajaranAktif={tahunPelajaranAktif} />;
      case 'pengaturan-waktu':
        return (
          <KontenPengaturanWaktu 
  pengaturanJam={pengaturanJam} 
  setPengaturanJam={setPengaturanJam} 
  dataGuru={dataGuru} 
  setDataGuru={setDataGuru} 
  isDarkMode={isDarkMode} 
/>
        );
      case 'pengaturan-umum':
        return (
          <KontenPengaturanUmum 
            infoSekolah={infoSekolah} 
            setInfoSekolah={setInfoSekolah}
            adminCredential={adminCredential}
            setAdminCredential={setAdminCredential}
            pengaturanAudio={pengaturanAudio}
            setPengaturanAudio={setPengaturanAudio}
            isDarkMode={isDarkMode}
          />
        );
      default:
        return (
          <KontenAbsenSekolah 
            dataGuru={dataGuru} 
            dataSiswa={dataSiswa} 
            logKehadiran={logKehadiran} 
            setLogKehadiran={setLogKehadiran}
            pengaturanJam={pengaturanJam}
            infoSekolah={infoSekolah}
            playBeep={playBeep}
            arsipAbsensi={arsipAbsensi}
            setArsipAbsensi={setArsipAbsensi}
            isDarkMode={isDarkMode}
            tahunPelajaranAktif={tahunPelajaranAktif}
          />
        );
    }
  };

 return (
    <div className={`flex h-screen ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-gray-50 text-gray-800'} font-sans overflow-hidden transition-colors relative`}>
      
      {/* Backdrop Hitam Transparan khusus HP saat Sidebar Terbuka */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)} 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
        ></div>
      )}

      {/* === SIDEBAR KIRI (Responsif: Laci di HP, Sidebar biasa di PC) === */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0 w-72' : '-translate-x-full md:translate-x-0 md:w-0 md:hidden'} 
        ${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-gray-200'} 
        border-r flex flex-col shadow-2xl md:shadow-none flex-shrink-0
      `}>
        <div className={`flex items-center justify-between p-6 border-b ${isDarkMode ? 'border-slate-800' : 'border-gray-100'}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white overflow-hidden flex-shrink-0 shadow-md">
              {infoSekolah.logo ? <img src={infoSekolah.logo} alt="Logo" className="w-full h-full object-cover" /> : <School size={24} />}
            </div>
            <div>
              <h1 className={`font-bold text-xs ${isDarkMode ? 'text-white' : 'text-gray-900'} leading-tight`}>
                PRESENSI KEHADIRAN<br/>SEKOLAH
              </h1>
            </div>
          </div>
          {/* Tombol Tutup (X) khusus tampilan HP di dalam sidebar */}
          <button 
            onClick={() => setIsSidebarOpen(false)} 
            className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg font-bold"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3">
          <div className="mb-6">
            <p className="px-3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Administrator</p>
            <ul className="space-y-1">
              <MenuItem id="rekapitulasi" icon={BarChart2} label="Rekapitulasi & Rapor" activeMenu={activeMenu} onClick={(id) => { setActiveMenu(id); setIsSidebarOpen(false); }} isDarkMode={isDarkMode} />
              <MenuItem id="tahun-pelajaran" icon={Layers} label="Tahun Pelajaran & Kelas" activeMenu={activeMenu} onClick={(id) => { setActiveMenu(id); setIsSidebarOpen(false); }} isDarkMode={isDarkMode} />
              <MenuItem id="master-data" icon={Users} label="Master Data Siswa & Guru" activeMenu={activeMenu} onClick={(id) => { setActiveMenu(id); setIsSidebarOpen(false); }} isDarkMode={isDarkMode} />
              <MenuItem id="jadwal-piket" icon={Calendar} label="Jadwal Piket Guru" activeMenu={activeMenu} onClick={(id) => { setActiveMenu(id); setIsSidebarOpen(false); }} isDarkMode={isDarkMode} />
              <MenuItem id="poin-disiplin" icon={AlertTriangle} label="Poin Disiplin & Pelanggaran" activeMenu={activeMenu} onClick={(id) => { setActiveMenu(id); setIsSidebarOpen(false); }} isDarkMode={isDarkMode} />
              <MenuItem id="tren-disiplin" icon={TrendingUp} label="Tren & Statistik Disiplin" activeMenu={activeMenu} onClick={(id) => { setActiveMenu(id); setIsSidebarOpen(false); }} isDarkMode={isDarkMode} />
              <MenuItem id="perizinan-siswa" icon={FileCheck} label="Perizinan & Surat Sakit" activeMenu={activeMenu} onClick={(id) => { setActiveMenu(id); setIsSidebarOpen(false); }} isDarkMode={isDarkMode} />
              <MenuItem id="cetak-kartu" icon={Printer} label="Cetak Kartu RFID / QR" activeMenu={activeMenu} onClick={(id) => { setActiveMenu(id); setIsSidebarOpen(false); }} isDarkMode={isDarkMode} />
              <MenuItem id="pengaturan-waktu" icon={Clock} label="Pengaturan Jam" activeMenu={activeMenu} onClick={(id) => { setActiveMenu(id); setIsSidebarOpen(false); }} isDarkMode={isDarkMode} />
              <MenuItem id="pengaturan-umum" icon={Settings} label="Pengaturan Umum" activeMenu={activeMenu} onClick={(id) => { setActiveMenu(id); setIsSidebarOpen(false); }} isDarkMode={isDarkMode} />
            </ul>
          </div>
          <div>
            <p className="px-3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Absensi</p>
            <ul className="space-y-1">
              <MenuItem id="absen-sekolah" icon={BookOpen} label="Absen Sekolah" activeMenu={activeMenu} onClick={(id) => { setActiveMenu(id); setIsSidebarOpen(false); }} isDarkMode={isDarkMode} />
              <MenuItem id="absen-rfid" icon={CreditCard} label="Absen RFID / QR" activeMenu={activeMenu} onClick={(id) => { setActiveMenu(id); setIsSidebarOpen(false); }} isDarkMode={isDarkMode} />
              <MenuItem id="mode-piket" icon={ShieldCheck} label="Mode Piket (Gerbang)" activeMenu={activeMenu} onClick={(id) => { setActiveMenu(id); setIsSidebarOpen(false); }} isDarkMode={isDarkMode} />
              <MenuItem id="info-sekolah-tv" icon={Tv} label="Info Sekolah (Layar TV)" activeMenu={activeMenu} onClick={(id) => { setActiveMenu(id); setIsSidebarOpen(false); }} isDarkMode={isDarkMode} />
            </ul>
          </div>
        </div>

        <div className={`p-4 border-t ${isDarkMode ? 'border-slate-800' : 'border-gray-100'}`}>
          <button 
            onClick={handleLogout}
            className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition text-sm cursor-pointer"
          >
            <LogOut size={18} /> Keluar (Logout)
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className={`${isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-gray-200 text-gray-800'} border-b py-4 px-6 flex items-center justify-between shadow-sm z-10 transition-colors`}>
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className={`p-2 ${isDarkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-gray-500 hover:bg-gray-100'} rounded-lg transition`}>
              <Menu size={24} />
            </button>
            <h2 className="text-2xl font-bold capitalize">
              {activeMenu.replace('-', ' ')}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold ${isDarkMode ? 'bg-blue-950/60 border-blue-900 text-blue-300' : 'bg-blue-50 border-blue-200 text-blue-700'}`}>
              <Layers size={14} />
              <span>TP: {tahunPelajaranAktif}</span>
            </div>

            <button 
              onClick={() => setIsDarkMode(!isDarkMode)} 
              className={`p-2.5 rounded-xl border transition flex items-center gap-2 text-xs font-semibold cursor-pointer ${isDarkMode ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'}`}
              title="Ganti Mode Terang / Gelap"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              <span className="hidden sm:inline">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>

            <button 
              onClick={() => {
                setTempPhotoInput(adminPhoto);
                setIsProfileModalOpen(true);
              }}
              className="relative group cursor-pointer"
              title="Klik untuk mengganti foto profil"
            >
              <div className="w-10 h-10 rounded-full border-2 border-blue-500 bg-gray-100 overflow-hidden shadow-md transition group-hover:scale-105">
                <img src={adminPhoto} alt="Admin Profile" className="w-full h-full object-cover" />
              </div>
              <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition text-white">
                <Camera size={14} />
              </div>
            </button>
          </div>
        </header>

        <div className={`mx-6 mt-6 p-5 rounded-2xl border shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${
          isDarkMode ? 'bg-gradient-to-r from-blue-950 via-slate-900 to-slate-900 border-blue-900/50 text-slate-100' : 'bg-gradient-to-r from-blue-600 to-blue-800 border-blue-700 text-white'
        }`}>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full border-2 border-white/50 bg-white/10 overflow-hidden shadow-inner flex-shrink-0">
              <img src={adminPhoto} alt="Admin" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="inline-block px-2.5 py-0.5 bg-white/20 rounded-full text-[10px] font-bold uppercase tracking-wider mb-1">
                Tahun Pelajaran: {tahunPelajaranAktif}
              </span>
              <h3 className="text-xl sm:text-2xl font-black">
                Selamat Datang, <span className="font-extrabold text-amber-300">{adminCredential.username}</span>! 👋
              </h3>
              <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-blue-200' : 'text-blue-100'}`}>
  {infoSekolah.nama ? `${infoSekolah.nama}${infoSekolah.alamat ? ` - ${infoSekolah.alamat}` : ''} • ` : ''}Siap mengelola presensi dan administrasi sekolah hari ini.
</p>
            </div>
          </div>

          <div className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2 self-stretch sm:self-auto justify-center ${
            isDarkMode ? 'bg-slate-800/80 border border-slate-700 text-blue-300' : 'bg-white/10 border border-white/20 text-white'
          }`}>
            <Calendar size={16} />
            <span>{new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
        </div>

        <div className={`flex-1 overflow-y-auto p-6 ${isDarkMode ? 'bg-slate-950' : 'bg-gray-50'} transition-colors`}>
          {renderKontenUtama()}
        </div>
      </main>

      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className={`${isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white text-gray-800'} w-full max-w-md rounded-3xl shadow-2xl overflow-hidden`}>
            <div className={`flex justify-between items-center p-6 border-b ${isDarkMode ? 'border-slate-800' : 'border-gray-100'}`}>
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Camera className="text-blue-600" /> Pengaturan Foto Profil Admin
              </h3>
              <button onClick={() => setIsProfileModalOpen(false)} className="opacity-70 hover:opacity-100 transition"><X size={20}/></button>
            </div>
            
            <div className="p-6 space-y-6 text-center">
              <div className="w-28 h-28 mx-auto rounded-full border-4 border-blue-500 overflow-hidden shadow-xl bg-slate-800 flex items-center justify-center">
                <img src={tempPhotoInput} alt="Preview" className="w-full h-full object-cover" />
              </div>
              
              <div className="space-y-3">
                <label className={`block text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'} uppercase tracking-wider`}>Upload Foto dari Perangkat (File)</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => setTempPhotoInput(reader.result);
                      reader.readAsDataURL(file);
                    }
                  }}
                  className={`block w-full text-xs ${isDarkMode ? 'text-slate-300' : 'text-slate-600'} file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer border ${isDarkMode ? 'border-slate-700 bg-slate-800' : 'border-gray-200 bg-gray-50'} rounded-xl`}
                />
              </div>

              <div>
                <label className={`block text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'} uppercase tracking-wider mb-1 text-left`}>Atau Masukkan Link URL Gambar</label>
                <input 
                  type="text" 
                  value={tempPhotoInput.startsWith('data:') ? '(Gambar Lokal Diunggah)' : tempPhotoInput}
                  onChange={(e) => setTempPhotoInput(e.target.value)}
                  className={`w-full border p-3 rounded-xl text-xs ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'}`}
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className={`p-4 border-t ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-gray-50'} flex justify-end gap-3`}>
              <button 
                type="button" 
                onClick={() => setIsProfileModalOpen(false)} 
                className="px-4 py-2.5 rounded-xl text-sm font-medium cursor-pointer"
              >
                Batal
              </button>
              <button 
                type="button" 
                onClick={() => {
                  setAdminPhoto(tempPhotoInput);
                  setIsProfileModalOpen(false);
                  alert('Foto profil admin berhasil diperbarui!');
                }} 
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium flex items-center gap-2 shadow cursor-pointer"
              >
                <CheckCircle size={16} /> Simpan Foto Profil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


/* ==============================================================
   1. KOMPONEN ABSEN SEKOLAH (LENGKAP: JAM REAL-TIME, FULLSCREEN, & FORMAT WA
============================================================== */
const KontenAbsenSekolah = ({ dataGuru, dataSiswa, logKehadiran, setLogKehadiran, pengaturanJam, infoSekolah, playBeep, arsipAbsensi, setArsipAbsensi, isDarkMode, tahunPelajaranAktif }) => {
  const [rfidInput, setRfidInput] = useState('');
  const [searchTable, setSearchTable] = useState('');
  const [selectedKategoriFilter, setSelectedKategoriFilter] = useState('Semua');
  const [sortOrder, setSortOrder] = useState('none');
  const [toastNotif, setToastNotif] = useState(null);
  
  const [lastScannedUser, setLastScannedUser] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [showModalTutupBuku, setShowModalTutupBuku] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(err => console.log(err));
      }
    };
  }, []);

  const showToast = (message, type = 'success') => {
    setToastNotif({ message, type });
    setTimeout(() => {
      setToastNotif(null);
    }, 3000);
  };

  // AMBIL CONFIG JAM AKTIF BERDASARKAN MODE (PAGI / SIANG / FULL DAY)
  const currentMode = pengaturanJam.modeAktif || 'Pagi';
  let activeJamConfig = pengaturanJam.pagi;
  if (currentMode === 'Siang') activeJamConfig = pengaturanJam.siang;
  else if (currentMode === 'Full Day' || currentMode === 'FullDay') activeJamConfig = pengaturanJam.fullDay;

  const siswaAktifTP = dataSiswa.filter(s => {
    const statusTP = s.statusTP?.[tahunPelajaranAktif] || 'Aktif';
    const kelasTP = s.kelasPerTP?.[tahunPelajaranAktif];
    return statusTP === 'Aktif' && kelasTP;
  });

  // TANGGAL HARI INI UNTUK FILTER OTOMATIS GANTI HARI
  const tanggalHariIniStr = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

  // FILTER LOG KHUSUS TAHUN PELAJARAN AKTIF DAN TANGGAL HARI INI
  const logsTpAktif = logKehadiran.filter(l => l.tahunPelajaran === tahunPelajaranAktif && l.tanggal === tanggalHariIniStr);

  const hadirGuru = logsTpAktif.filter(log => log.role === 'guru' && log.status !== 'Izin' && log.status !== 'Sakit').length;
  const hadirSiswa = logsTpAktif.filter(log => log.role === 'siswa' && log.status !== 'Izin' && log.status !== 'Sakit').length;

  const kelasSiswaUnik = [...new Set(logsTpAktif.filter(l => l.role === 'siswa').map(l => l.jabatan_kelas))].sort();
  const adaGuruHadir = logsTpAktif.some(l => l.role === 'guru');

  const enterFullscreen = () => {
    if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(err => {
        showToast(`Gagal masuk fullscreen: ${err.message}`, 'error');
      });
    }
  };

  const exitFullscreen = () => {
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(err => {
        console.log(err);
      });
    }
  };

  const handleScanRFID = async (e) => {
    if (e.key === 'Enter') {
      const scannedRfid = rfidInput.trim().toUpperCase();
      if (!scannedRfid) return;

      let user = dataGuru.find(g => g.rfid.toUpperCase() === scannedRfid);
      let userRole = 'guru';
      let userKelas = '';

      if (!user) {
        const foundSiswa = dataSiswa.find(s => s.rfid.toUpperCase() === scannedRfid);
        if (foundSiswa) {
          const statusTP = foundSiswa.statusTP?.[tahunPelajaranAktif] || 'Aktif';
          const kelasTP = foundSiswa.kelasPerTP?.[tahunPelajaranAktif];
          if (statusTP !== 'Aktif' || !kelasTP) {
            playBeep(false);
            showToast(`Siswa ${foundSiswa.nama} belum terdaftar atau sudah Lulus pada Tahun Pelajaran ${tahunPelajaranAktif}!`, 'error');
            setRfidInput('');
            return;
          }
          user = foundSiswa;
          userRole = 'siswa';
          userKelas = kelasTP;
        }
      } else {
        userKelas = user.jabatan_kelas;
      }

      if (user) {
        playBeep(true);
        const now = new Date();
        const currentTimeStr = now.toTimeString().split(' ')[0]; // Contoh: "13:30:15"
        const currentTimeFormatted = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        
        // Cek log berdasarkan rfid, tahun pelajaran, dan tanggal hari ini
        const existingLogIndex = logKehadiran.findIndex(log => log.rfid.toUpperCase() === scannedRfid && log.tahunPelajaran === tahunPelajaranAktif && log.tanggal === tanggalHariIniStr);
        let statusAktivitas = '';
        let infoWaktu = '';

        if (existingLogIndex >= 0) {
          const targetLog = logKehadiran[existingLogIndex];
          if (!targetLog.waktuPulang) {
            const waktuPulangBaru = currentTimeFormatted;
            
            // --- UPDATE KE SUPABASE (PULANG) ---
            const { error: updateError } = await supabase
              .from('log_kehadiran')
              .update({ waktuPulang: waktuPulangBaru })
              .eq('id', targetLog.id);

            if (updateError) {
              console.error("Gagal update pulang ke Supabase:", updateError.message);
              showToast('Gagal memperbarui data pulang ke database!', 'error');
            }
            // -----------------------------------

            const updatedLogs = [...logKehadiran];
            updatedLogs[existingLogIndex].waktuPulang = waktuPulangBaru;
            
            const [pulangItem] = updatedLogs.splice(existingLogIndex, 1);
            updatedLogs.unshift(pulangItem);

            setLogKehadiran(updatedLogs);
            statusAktivitas = 'Absen Pulang Berhasil';
            infoWaktu = waktuPulangBaru;
          } else {
            showToast(`${user.nama} sudah melakukan presensi pulang hari ini.`, 'error');
            setRfidInput('');
            return;
          }
        } else {
          // PENENTUAN STATUS KEHADIRAN (GURU VS SISWA)
          let statusKehadiran = 'Tepat Waktu';

          if (userRole === 'guru') {
            const listHariIndo = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
            const namaHariIni = listHariIndo[now.getDay()];
            const jadwalGuruHariIni = user.jadwalMengajar?.[namaHariIni];

            if (jadwalGuruHariIni) {
              if (!jadwalGuruHariIni.aktif) {
                statusKehadiran = 'Hadir (Luar Jadwal)';
              } else {
                const jamMulaiGuru = jadwalGuruHariIni.jamMulai.length === 5 ? `${jadwalGuruHariIni.jamMulai}:00` : jadwalGuruHariIni.jamMulai;
                statusKehadiran = currentTimeStr > jamMulaiGuru ? 'Terlambat' : 'Tepat Waktu';
              }
            } else {
              statusKehadiran = currentTimeStr > '07:30:00' ? 'Terlambat' : 'Tepat Waktu';
            }
          } else {
            // STATUS SISWA (Mengikuti toleransi jam sekolah mode aktif: Pagi / Siang / Full Day)
            const batasTelatRaw = activeJamConfig?.ambangTerlambat || '07:15';
            const ambangSiswa = batasTelatRaw.length === 5 ? `${batasTelatRaw}:00` : batasTelatRaw;
            statusKehadiran = currentTimeStr > ambangSiswa ? 'Terlambat' : 'Tepat Waktu';
          }

          const newLog = {
            id: Date.now(),
            rfid: user.rfid,
            nama: user.nama,
            jabatan_kelas: userRole === 'siswa' ? userKelas : user.jabatan_kelas,
            role: userRole,
            waktuDatang: currentTimeFormatted,
            waktuPulang: null,
            status: statusKehadiran,
            tanggal: tanggalHariIniStr,
            tahunPelajaran: tahunPelajaranAktif
          };

          // --- INSERT KE SUPABASE (DATANG) ---
          const { error: insertError } = await supabase
            .from('log_kehadiran')
            .insert([newLog]);
          
          if (insertError) {
            console.error("Gagal simpan ke Supabase:", insertError.message);
            showToast('Gagal menyimpan ke database cloud!', 'error');
          }
          // ----------------------------------

          setLogKehadiran([newLog, ...logKehadiran]);
          statusAktivitas = `Absen Datang (${statusKehadiran})`;
          infoWaktu = currentTimeFormatted;
        }

        setLastScannedUser({
          nama: user.nama,
          jabatan_kelas: userRole === 'siswa' ? userKelas : user.jabatan_kelas,
          foto: user.foto || null,
          status: statusAktivitas,
          waktu: infoWaktu
        });

      } else {
        playBeep(false);
        showToast('Kartu RFID atau QR Code tidak terdaftar di sistem!', 'error');
      }
      setRfidInput('');
    }
  };

  // ==========================================================
  // UPDATE STATUS MANUAL (TERHUBUNG KE SUPABASE)
  // ==========================================================
  const updateStatusManual = async (id, statusBaru) => {
    // 1. Update ke Supabase
    const { error } = await supabase
      .from('log_kehadiran')
      .update({ status: statusBaru })
      .eq('id', id);

    if (error) {
      console.error("Gagal update status manual:", error.message);
      showToast('Gagal memperbarui status di cloud!', 'error');
      return;
    }

    // 2. Update state lokal
    const updated = logKehadiran.map(log => log.id === id ? { ...log, status: statusBaru } : log);
    setLogKehadiran(updated);
    showToast('Status kehadiran berhasil diperbarui!', 'success');
  };

  const handleOpenTutupBukuModal = () => {
    if (logsTpAktif.length === 0) {
      alert(`Belum ada data presensi untuk Tahun Pelajaran ${tahunPelajaranAktif} hari ini.`);
      return;
    }
    setShowModalTutupBuku(true);
  };

  const handleKonfirmasiTutupBuku = () => {
    if (window.confirm(`Selesaikan Tutup Buku dan arsipkan seluruh data presensi hari ini?`)) {
      const tanggalArsip = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
      const newArchive = {
        id: Date.now(),
        tanggalArsip,
        tahunPelajaran: tahunPelajaranAktif,
        totalLog: logsTpAktif.length,
        data: logsTpAktif
      };

      setArsipAbsensi([newArchive, ...arsipAbsensi]);
      setLogKehadiran(logKehadiran.filter(l => !(l.tahunPelajaran === tahunPelajaranAktif && l.tanggal === tanggalHariIniStr))); 
      setShowModalTutupBuku(false);
      showToast('Berhasil! Buku absensi hari ini telah ditutup dan diarsipkan.', 'success');
    }
  };

  const handleKirimWA = (namaKelompok, roleKelompok) => {
    const tanggalHariIni = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    
    const logsKelompok = logsTpAktif.filter(l => {
      if (roleKelompok === 'guru') return l.role === 'guru';
      return l.role === 'siswa' && l.jabatan_kelas.toLowerCase() === namaKelompok.toLowerCase();
    });

    const totalHadirTepatWaktu = logsKelompok.filter(l => ['Tepat Waktu', 'Hadir'].includes(l.status)).length;
    const totalTerlambat = logsKelompok.filter(l => l.status === 'Terlambat').length;
    const totalSakit = logsKelompok.filter(l => l.status === 'Sakit').length;
    const totalIzin = logsKelompok.filter(l => l.status === 'Izin').length;
    const totalAlpa = logsKelompok.filter(l => l.status === 'Alpa').length;

    const jumlahHadirTotal = totalHadirTepatWaktu + totalTerlambat;
    const catatanKhusus = logsKelompok.filter(l => ['Terlambat', 'Sakit', 'Izin', 'Alpa'].includes(l.status));

    let textWA = `*LAPORAN PRESENSI HARIAN*\n`;
    textWA += `*${infoSekolah.nama}*\n`;
    textWA += `Hari/Tgl: ${tanggalHariIni}\n`;
    textWA += `Kelompok: *${roleKelompok === 'guru' ? 'GURU & STAFF' : 'Kelas ' + namaKelompok}*\n`;
    textWA += `----------------------------------\n`;
    textWA += `*Jumlah Hadir: ${jumlahHadirTotal} orang*\n`;
    textWA += `- Hadir (Tepat Waktu): ${totalHadirTepatWaktu} orang\n`;
    textWA += `- Hadir (Terlambat): ${totalTerlambat} orang\n`;
    textWA += `- Sakit: ${totalSakit} orang\n`;
    textWA += `- Izin: ${totalIzin} orang\n`;
    if (roleKelompok === 'siswa') textWA += `- Alpa: ${totalAlpa} orang\n`;
    textWA += `----------------------------------\n`;

    if (catatanKhusus.length > 0) {
      textWA += `*Catatan Khusus Kehadiran:*\n`;
      catatanKhusus.forEach((item, index) => {
        const jamScan = item.waktuDatang && item.waktuDatang !== '-' ? ` (${item.waktuDatang} WIB)` : '';
        const statusLabel = item.status === 'Terlambat' ? 'Hadir (Terlambat)' : item.status;
        textWA += `${index + 1}. *${item.nama}* - Status: ${statusLabel}${jamScan}\n`;
      });
      textWA += `----------------------------------\n`;
    }

    textWA += `_Laporan otomatis disiapkan oleh Sistem Presensi Sekolah._`;

    const encodedUrl = `https://wa.me/?text=${encodeURIComponent(textWA)}`;
    window.open(encodedUrl, '_blank');
  };

  const toggleSort = () => {
    if (sortOrder === 'none') setSortOrder('asc');
    else if (sortOrder === 'asc') setSortOrder('desc');
    else setSortOrder('none');
  };

  let processedLogs = logsTpAktif.filter(log => {
    const matchSearch = log.nama.toLowerCase().includes(searchTable.toLowerCase()) || 
                        log.jabatan_kelas.toLowerCase().includes(searchTable.toLowerCase());
    
    let matchKategori = true;
    if (selectedKategoriFilter === 'Guru & Staff') {
      matchKategori = log.role === 'guru';
    } else if (selectedKategoriFilter !== 'Semua') {
      matchKategori = log.role === 'siswa' && log.jabatan_kelas.toLowerCase() === selectedKategoriFilter.toLowerCase();
    }

    return matchSearch && matchKategori;
  });

  if (sortOrder !== 'none') {
    processedLogs.sort((a, b) => {
      const kelasA = a.jabatan_kelas.toLowerCase();
      const kelasB = b.jabatan_kelas.toLowerCase();

      if (kelasA < kelasB) return sortOrder === 'asc' ? -1 : 1;
      if (kelasA > kelasB) return sortOrder === 'asc' ? 1 : -1;

      const waktuA = a.waktuDatang || '';
      const waktuB = b.waktuDatang || '';
      return waktuA.localeCompare(waktuB);
    });
  }

  const daftarKelasLogHariIni = [...new Set(logsTpAktif.filter(l => l.role === 'siswa').map(l => l.jabatan_kelas))].sort();

  return (
    <div className={`${isFullscreen ? 'max-w-none w-full px-6' : 'max-w-7xl mx-auto'} transition-all duration-300 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start relative`}>
      
      {isFullscreen && (
        <button 
          onClick={exitFullscreen}
          className="fixed top-4 right-4 z-50 bg-rose-600 hover:bg-rose-700 text-white px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-2xl transition-all animate-bounce cursor-pointer text-sm border-2 border-white/20"
          title="Keluar dari Layar Penuh"
        >
          <X size={18} /> Keluar Fullscreen
        </button>
      )}

      {/* KOLOM KIRI */}
      <div className="lg:col-span-1 space-y-3">
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
          
          <div className={`${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-gray-100 text-gray-800'} p-3.5 rounded-xl shadow-sm border flex flex-col justify-between`}>
            <div>
              <div className="flex flex-col items-center text-center gap-1.5 mb-2">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 overflow-hidden shadow-sm flex-shrink-0">
                  {infoSekolah.logo ? <img src={infoSekolah.logo} alt="Logo" className="w-full h-full object-cover" /> : <School size={20} />}
                </div>
                <h3 className="font-bold text-xs leading-snug line-clamp-2">{infoSekolah.nama}</h3>
              </div>

              <div className="text-center mb-2 bg-slate-950/80 border border-slate-800 py-1.5 px-2 rounded-xl">
                <div className="text-yellow-400 font-mono font-black text-xs tracking-wider flex items-center justify-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping"></span>
                  {currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })} WIB
                </div>
              </div>

              <div className="text-center mb-2">
                <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-700 font-bold text-[10px] rounded-full border border-blue-200">
                  TP {tahunPelajaranAktif} &bull; {pengaturanJam.modeAktif}
                </span>
              </div>
            </div>

            <div className={`text-[11px] ${isDarkMode ? 'text-slate-400 border-slate-800' : 'text-slate-500 border-gray-100'} pt-2 border-t space-y-0.5`}>
              <div className="flex justify-between">
                <span>Siswa Aktif:</span>
                <span className="font-bold">{siswaAktifTP.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Jam Masuk:</span>
                <span className="font-bold text-emerald-500">{activeJamConfig.jamMasuk || '07:00'}</span>
              </div>
              <div className="flex justify-between">
                <span>Batas Terlambat:</span>
                <span className="font-bold text-red-500">{activeJamConfig.ambangTerlambat}</span>
              </div>
              <div className="flex justify-between">
                <span>Jam Pulang:</span>
                <span className="font-bold">{activeJamConfig.jamPulang}</span>
              </div>
            </div>
          </div>

          <div className={`${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-gray-100 text-gray-800'} p-3.5 rounded-xl shadow-sm border flex flex-col items-center text-center justify-between`}>
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Scan Terakhir</span>
            
            <div className="w-full h-40 rounded-xl overflow-hidden border-2 border-blue-500 shadow-md bg-slate-900 flex items-center justify-center flex-shrink-0 my-1.5">
              {lastScannedUser && lastScannedUser.foto ? (
                <img src={lastScannedUser.foto} alt={lastScannedUser.nama} className="w-full h-full object-cover object-top" />
              ) : (
                <User size={48} className="text-gray-400" />
              )}
            </div>

            <div className="overflow-hidden w-full">
              {lastScannedUser ? (
                <>
                  <h4 className="font-bold text-xs truncate leading-tight">{lastScannedUser.nama}</h4>
                  <p className="text-[10px] font-bold text-emerald-500 truncate pt-0.5">{lastScannedUser.status}</p>
                </>
              ) : (
                <p className="text-[11px] text-gray-400 italic">Belum ada</p>
              )}
            </div>
          </div>

        </div>

        <div className="space-y-1">
          {toastNotif && (
            <div className={`p-2.5 rounded-xl text-xs font-bold shadow-lg transition-all animate-bounce ${
              toastNotif.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
            }`}>
              {toastNotif.message}
            </div>
          )}

          <div className="relative">
            <CreditCard className="absolute inset-y-0 left-4 my-auto h-5 w-5 text-gray-400" />
            <input
              type="text"
              autoFocus
              value={rfidInput}
              onChange={(e) => setRfidInput(e.target.value)}
              onKeyDown={handleScanRFID}
              className={`block w-full pl-12 pr-4 py-3.5 ${isDarkMode ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'} border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-base`}
              placeholder="Scan RFID / QR Code..."
            />
          </div>
        </div>

        <div className={`${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-gray-100 text-gray-800'} p-4 rounded-xl shadow-sm border space-y-3`}>
          <h3 className="font-bold text-sm">Rekap Kehadiran & Pulang (Hari Ini)</h3>
          
          <div className="space-y-2.5">
            <div className={`p-2.5 rounded-lg ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-gray-50 border text-gray-800'} space-y-1`}>
              <div className="flex justify-between items-center text-xs font-medium">
                <span>Hadir (Guru)</span>
                <span className="font-bold text-blue-500">{hadirGuru} Orang</span>
              </div>
              <div className="flex justify-between items-center text-xs opacity-80 pt-1 border-t border-gray-500/10">
                <span>Sudah Pulang: <strong className="text-emerald-500">{logsTpAktif.filter(l => l.role === 'guru' && l.waktuPulang).length}</strong></span>
                <span>Belum Pulang: <strong className="text-amber-500">{logsTpAktif.filter(l => l.role === 'guru' && !l.waktuPulang).length}</strong></span>
              </div>
            </div>

            <div className={`p-2.5 rounded-lg ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-gray-50 border text-gray-800'} space-y-1`}>
              <div className="flex justify-between items-center text-xs font-medium">
                <span>Hadir (Siswa)</span>
                <span className="font-bold text-blue-500">{hadirSiswa} Orang</span>
              </div>
              <div className="flex justify-between items-center text-xs opacity-80 pt-1 border-t border-gray-500/10">
                <span>Sudah Pulang: <strong className="text-emerald-500">{logsTpAktif.filter(l => l.role === 'siswa' && l.waktuPulang).length}</strong></span>
                <span>Belum Pulang: <strong className="text-amber-500">{logsTpAktif.filter(l => l.role === 'siswa' && !l.waktuPulang).length}</strong></span>
              </div>
            </div>
          </div>

          <button 
            onClick={handleOpenTutupBukuModal}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2.5 rounded-xl flex items-center justify-center gap-2 shadow transition cursor-pointer text-sm"
          >
            <Archive size={16} /> Tutup Buku & Rekap kehadiran / Kirim WhatsApp
          </button>
        </div>
      </div>

      {/* KOLOM KANAN (Tabel Data Kehadiran) */}
      <div className="lg:col-span-2">
        <div className={`${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-gray-100 text-gray-800'} rounded-xl shadow-sm border flex flex-col max-h-[85vh]`}>
          
          <div className={`p-6 border-b ${isDarkMode ? 'border-slate-800' : 'border-gray-100'} flex flex-col sm:flex-row justify-between items-center gap-4 flex-shrink-0`}>
            <h3 className="text-xl font-bold">List Data Kehadiran ({tanggalHariIniStr})</h3>
            
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <select
                value={selectedKategoriFilter}
                onChange={(e) => setSelectedKategoriFilter(e.target.value)}
                className={`px-3 py-2 border rounded-lg text-sm font-semibold ${isDarkMode ? 'bg-slate-800 border-slate-700 text-blue-400' : 'bg-blue-50 border-gray-200 text-blue-700'}`}
                title="Filter berdasarkan Kategori atau Kelas"
              >
                <option value="Semua" className="bg-slate-900 text-white">Filter: Semua (Guru & Siswa)</option>
                {adaGuruHadir && (
                  <option value="Guru & Staff" className="bg-slate-900 text-white">Filter: Guru & Staff (Semua)</option>
                )}
                {kelasSiswaUnik.map(kelas => (
                  <option key={kelas} value={kelas} className="bg-slate-900 text-white">
                    Filter Kelas: {kelas}
                  </option>
                ))}
              </select>

              {!isFullscreen && (
                <button 
                  onClick={enterFullscreen}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 shadow transition cursor-pointer text-sm whitespace-nowrap"
                  title="Aktifkan Layar Penuh"
                >
                  <Tv size={16} /> Mode Fullscreen
                </button>
              )}

              <input
                type="text"
                value={searchTable}
                onChange={(e) => setSearchTable(e.target.value)}
                className={`px-4 py-2 border rounded-lg text-sm flex-1 sm:flex-initial ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-white border-gray-200 text-gray-800'}`}
                placeholder="Cari nama..."
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-2">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 z-10">
                <tr className={`${isDarkMode ? 'bg-slate-900 text-slate-400 border-slate-800' : 'bg-gray-50 text-gray-500'} text-xs uppercase border-b`}>
                  <th className="px-6 py-4">No.</th>
                  <th className="px-6 py-4">Nama</th>
                  
                  <th className="px-6 py-4 cursor-pointer select-none hover:text-blue-500 transition" onClick={toggleSort} title="Klik untuk mengurutkan Jabatan/Kelas & Jam Datang">
                    <div className="flex items-center gap-1.5">
                      <span>Jabatan/Kelas</span>
                      <span className="flex flex-col text-[10px] leading-none opacity-70">
                        <span className={sortOrder === 'asc' ? 'text-blue-500 font-bold scale-125' : ''}>▲</span>
                        <span className={sortOrder === 'desc' ? 'text-blue-500 font-bold scale-125' : ''}>▼</span>
                      </span>
                    </div>
                  </th>

                  <th className="px-6 py-4">Datang</th>
                  <th className="px-6 py-4">Pulang</th>
                  <th className="px-6 py-4">Status / Ubah</th>
                </tr>
              </thead>
              <tbody className={`text-sm divide-y ${isDarkMode ? 'divide-slate-800' : 'divide-gray-100'}`}>
                {processedLogs.length > 0 ? processedLogs.map((log, idx) => (
                  <tr key={log.id} className={`${isDarkMode ? 'hover:bg-slate-800/50' : 'hover:bg-gray-50'}`}>
                    <td className="px-6 py-4">{idx + 1}</td>
                    <td className="px-6 py-4 font-medium">{log.nama}</td>
                    <td className="px-6 py-4 font-semibold text-blue-500">{log.jabatan_kelas}</td>
                    <td className="px-6 py-4 text-green-500 font-medium">{log.waktuDatang}</td>
                    <td className="px-6 py-4 text-orange-500 font-medium">{log.waktuPulang || '-'}</td>
                    <td className="px-6 py-4">
                      <select 
                        value={log.status} 
                        onChange={(e) => updateStatusManual(log.id, e.target.value)}
                        className={`text-xs font-bold p-1.5 rounded border ${
                          log.status === 'Terlambat' ? 'bg-red-500/10 text-red-400 border-red-500/30' :
                          log.status === 'Izin' ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' :
                          log.status === 'Sakit' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' :
                          'bg-green-500/10 text-green-400 border-green-500/30'
                        }`}
                      >
                        <option value="Tepat Waktu" className="bg-slate-900 text-white">Tepat Waktu</option>
                        <option value="Terlambat" className="bg-slate-900 text-white">Terlambat</option>
                        <option value="Izin" className="bg-slate-900 text-white">Izin</option>
                        <option value="Sakit" className="bg-slate-900 text-white">Sakit</option>
                      </select>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="6" className="text-center py-12 text-gray-400">Belum ada data kehadiran untuk hari ini. Silakan lakukan scan kartu atau absen manual.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL TUTUP BUKU & REKAP WA PER-KELAS */}
      {showModalTutupBuku && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className={`w-full max-w-3xl max-h-[90vh] flex flex-col rounded-3xl shadow-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-gray-200 text-gray-800'} overflow-hidden animate-fade-in`}>
            
            <div className="p-5 border-b flex justify-between items-center bg-orange-600 text-white">
              <div>
                <h3 className="text-base font-bold flex items-center gap-2">
                  <Archive size={18} /> Rekapitulasi Akhir Hari & Tutup Buku
                </h3>
                <p className="text-xs text-orange-100">Opsional: Kirim rekap ke WA per kelas atau langsung arsip dan reset hari ini</p>
              </div>
              <button 
                onClick={() => setShowModalTutupBuku(false)} 
                className="bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-xl text-white font-bold text-xs cursor-pointer">
                ✕ Batal
              </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto flex-1 text-left">
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                  Daftar Rekapitulasi Hari Ini ({tanggalHariIniStr}):
                </p>
                <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/30 px-2.5 py-1 rounded-full font-medium">
                  💡 Tombol WA di bawah bersifat opsional
                </span>
              </div>
              
              {logsTpAktif.some(l => l.role === 'guru') && (
                <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-gray-50 border-gray-200'}`}>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-blue-400">👩‍🏫 GURU & STAFF</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      Hadir: <strong className="text-emerald-400">{logsTpAktif.filter(l => l.role === 'guru' && ['Tepat Waktu', 'Hadir'].includes(l.status)).length}</strong> &bull; 
                      Terlambat: <strong className="text-amber-400">{logsTpAktif.filter(l => l.role === 'guru' && l.status === 'Terlambat').length}</strong> &bull; 
                      Sakit/Izin: <strong className="text-purple-400">{logsTpAktif.filter(l => l.role === 'guru' && ['Sakit', 'Izin'].includes(l.status)).length}</strong>
                    </p>
                  </div>
                  <button 
                    onClick={() => handleKirimWA('Guru & Staff', 'guru')} 
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow transition-all self-start sm:self-auto">
                    📱 Kirim WA Guru (Opsional)
                  </button>
                </div>
              )}

              {daftarKelasLogHariIni.map((namaKelas) => {
                const logsKelas = logsTpAktif.filter(l => l.role === 'siswa' && l.jabatan_kelas === namaKelas);
                const countHadir = logsKelas.filter(l => ['Tepat Waktu', 'Hadir'].includes(l.status)).length;
                const countTerlambat = logsKelas.filter(l => l.status === 'Terlambat').length;
                const countSakit = logsKelas.filter(l => l.status === 'Sakit').length;
                const countIzin = logsKelas.filter(l => l.status === 'Izin').length;
                const countAlpa = logsKelas.filter(l => l.status === 'Alpa').length;
                const countTotalHadir = countHadir + countTerlambat;

                return (
                  <div key={namaKelas} className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-gray-50 border-gray-200'}`}>
                    <div>
                      <span className="font-bold text-sm text-blue-400">🎓 KELAS: {namaKelas}</span>
                      <p className="text-xs text-gray-400 mt-1">
                        Jumlah Hadir: <strong className="text-emerald-400">{countTotalHadir}</strong> (Tepat Waktu: {countHadir}, Terlambat: {countTerlambat}) &bull; 
                        Sakit: <strong className="text-blue-400">{countSakit}</strong> &bull; 
                        Izin: <strong className="text-purple-400">{countIzin}</strong> &bull; 
                        Alpa: <strong className="text-rose-400">{countAlpa}</strong>
                      </p>
                    </div>
                    <button 
                      onClick={() => handleKirimWA(namaKelas, 'siswa')} 
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow transition-all self-start sm:self-auto">
                      📱 Kirim WA Kelas (Opsional)
                    </button>
                  </div>
                );
              })}
            </div>

            <div className={`p-4 border-t flex flex-col sm:flex-row justify-between items-center gap-3 ${isDarkMode ? 'border-slate-800 bg-slate-950' : 'border-gray-200 bg-gray-100'}`}>
              <p className="text-[11px] text-gray-400">Tidak wajib kirim WA. Anda bisa langsung klik arsipkan jika dirasa cukup.</p>
              <button 
                onClick={handleKonfirmasiTutupBuku} 
                className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-lg transition cursor-pointer whitespace-nowrap">
                🔒 Arsipkan & Tutup Buku Hari Ini
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

/* ==============================================================
   2. KOMPONEN ABSEN RFID & QR CODE
============================================================== */
const LayarPenuhRFID = ({ onBack, dataGuru, dataSiswa, logKehadiran, setLogKehadiran, pengaturanJam, infoSekolah, playBeep, isDarkMode, tahunPelajaranAktif, pengaturanUmum }) => {
  const [rfidInput, setRfidInput] = useState('');
  const [latestScan, setLatestScan] = useState(null);
  const [toastNotif, setToastNotif] = useState(null);
  const [currentTime, setCurrentTime] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(true);

  // Cache anti-spam cooldown per kartu (10 detik)
  const [lastScanMap, setLastScanMap] = useState({});

  // Update jam digital real-time
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' WIB');
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Deteksi status fullscreen browser
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const showToast = (message, type = 'success') => {
    setToastNotif({ message, type });
    setTimeout(() => setToastNotif(null), 3000);
  };

  // AMBIL CONFIG JAM AKTIF SECARA AMAN BERDASARKAN MODE APAPUN
  const currentMode = pengaturanJam?.modeAktif || 'Pagi';
  let activeJamConfig = pengaturanJam?.pagi || { jamMasuk: '07:00', ambangTerlambat: '07:15', jamPulang: '13:00' };
  if (currentMode === 'Siang') {
    activeJamConfig = pengaturanJam?.siang || { jamMasuk: '13:30', ambangTerlambat: '13:45', jamPulang: '18:00' };
  } else if (currentMode === 'Full Day' || currentMode === 'FullDay') {
    activeJamConfig = pengaturanJam?.fullDay || { jamMasuk: '07:00', ambangTerlambat: '07:15', jamPulang: '15:30' };
  }

  const speakText = (text) => {
    return; // Suara ucapan dimatikan total, hanya beep saja
  };

  // --- FUNGSI PROSES SCAN DENGAN SUPABASE SYNC ---
  const processAbsenData = async (identifier) => {
    if (!identifier) return;
    const cleanCode = identifier.trim().toUpperCase();
    
    const nowTime = Date.now();
    const lastTime = lastScanMap[cleanCode] || 0;
    if (nowTime - lastTime < 10000) {
      return; // Cooldown 10 detik agar tidak double scan
    }

    setLastScanMap(prev => ({ ...prev, [cleanCode]: nowTime }));

    let user = null;
    let userRole = 'guru';
    let userKelas = '';

    user = dataGuru.find(g => g.rfid && g.rfid.toUpperCase() === cleanCode);
    if (!user) {
      const foundSiswa = dataSiswa.find(s => 
        (s.rfid && s.rfid.toUpperCase() === cleanCode) || 
        (s.nisn && `NISN-${s.nisn}`.toUpperCase() === cleanCode) || 
        (s.nis && s.nis.toUpperCase() === cleanCode) || 
        (`ID-${s.id}`.toUpperCase() === cleanCode)
      );

      if (foundSiswa) {
        const statusTP = foundSiswa.statusTP?.[tahunPelajaranAktif] || 'Aktif';
        const kelasTP = foundSiswa.kelasPerTP?.[tahunPelajaranAktif];
        if (statusTP !== 'Aktif' || !kelasTP) {
          playBeep(false);
          showToast(`Siswa ${foundSiswa.nama} tidak aktif di TP ${tahunPelajaranAktif}!`, 'error');
          return;
        }
        user = foundSiswa;
        userRole = 'siswa';
        userKelas = kelasTP;
      }
    } else {
      userKelas = user.jabatan_kelas || 'Guru & Staff';
    }

    if (!user) {
      playBeep(false);
      showToast('Kartu RFID atau QR Code tidak terdaftar di sistem!', 'error');
      return;
    }

    const tanggalHariIniStr = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0]; // Format "HH:MM:SS"
    const timeFormatted = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    // Tentukan hari ini dalam Bahasa Indonesia untuk pengecekan jadwal guru
    const listHariIndo = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const namaHariIni = listHariIndo[now.getDay()];

    // Tentukan jam mulai pulang (mengikuti jadwal guru jika guru, atau jamPulang siswa)
    let jamMulaiPulangConfig = activeJamConfig?.jamPulang || '12:00';
    if (userRole === 'guru' && user.jadwalMengajar?.[namaHariIni]?.aktif) {
      jamMulaiPulangConfig = user.jadwalMengajar[namaHariIni].jamSelesai || '15:00';
    }

    const existingLog = logKehadiran.find(log => 
      log.rfid.toUpperCase() === (user.rfid ? user.rfid.toUpperCase() : cleanCode) && 
      log.tahunPelajaran === tahunPelajaranAktif && 
      log.tanggal === tanggalHariIniStr
    );

    if (existingLog) {
      // SUDAH ABSEN DATANG HARI INI
      if (existingLog.waktuPulang) {
        playBeep(false);
        showToast(`⚠️ ${user.nama} sudah selesai presensi lengkap hari ini!`, 'error');
        return;
      }

      // Cek apakah sudah masuk jam pulang
      if (timeStr >= jamMulaiPulangConfig) {
        // PROSES ABSEN PULANG KE SUPABASE
        playBeep(true);
        const { error: updateError } = await supabase
          .from('log_kehadiran')
          .update({ waktuPulang: timeFormatted })
          .eq('id', existingLog.id);

        if (updateError) {
          console.error("Gagal update pulang QR ke Supabase:", updateError.message);
          showToast("Gagal memperbarui absen pulang ke database cloud!", "error");
          return;
        }

        showToast(`✅ Absen Pulang Berhasil: ${user.nama}`, 'success');
        setLatestScan({
          nama: user.nama,
          kelas: userRole === 'siswa' ? userKelas : (user.jabatan_kelas || 'Guru & Staff'),
          foto: user.foto || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.nama}`,
          status: 'PULANG',
          waktu: timeFormatted,
          role: userRole
        });

        const updatedLogs = logKehadiran.map(log => log.id === existingLog.id ? { ...log, waktuPulang: timeFormatted } : log);
        setLogKehadiran(updatedLogs);
      } else {
        playBeep(false);
        showToast(`⚠️ ${user.nama} sudah absen datang. Belum waktunya jam pulang!`, 'error');
      }
    } else {
      // BELUM ADA LOG -> PROSES ABSEN DATANG KE SUPABASE
      playBeep(true);
      let statusKehadiran = 'Tepat Waktu';

      if (userRole === 'guru') {
        const jadwalGuruHariIni = user.jadwalMengajar?.[namaHariIni];
        if (jadwalGuruHariIni) {
          if (!jadwalGuruHariIni.aktif) {
            statusKehadiran = 'Hadir (Luar Jadwal)';
          } else {
            const jamMulaiGuru = jadwalGuruHariIni.jamMulai.length === 5 ? `${jadwalGuruHariIni.jamMulai}:00` : jadwalGuruHariIni.jamMulai;
            statusKehadiran = timeStr > jamMulaiGuru ? 'Terlambat' : 'Tepat Waktu';
          }
        } else {
          statusKehadiran = timeStr > '07:30:00' ? 'Terlambat' : 'Tepat Waktu';
        }
      } else {
        const batasTelatRaw = activeJamConfig?.ambangTerlambat || '07:15';
        const ambangSiswa = batasTelatRaw.length === 5 ? `${batasTelatRaw}:00` : batasTelatRaw;
        statusKehadiran = timeStr > ambangSiswa ? 'Terlambat' : 'Tepat Waktu';
      }

      const statusAbsenFinal = `DATANG (${statusKehadiran})`;

      const newLog = {
        id: Date.now() + Math.floor(Math.random() * 1000),
        rfid: user.rfid || cleanCode,
        nama: user.nama,
        jabatan_kelas: userRole === 'siswa' ? userKelas : (user.jabatan_kelas || 'Guru & Staff'),
        role: userRole,
        waktuDatang: timeFormatted,
        waktuPulang: null,
        status: statusKehadiran,
        tanggal: tanggalHariIniStr,
        tahunPelajaran: tahunPelajaranAktif
      };

      // INSERT KE SUPABASE
      const { error: insertError } = await supabase
        .from('log_kehadiran')
        .insert([newLog]);

      if (insertError) {
        console.error("Gagal insert QR ke Supabase:", insertError.message);
        showToast("Gagal menyimpan absen datang ke database cloud!", "error");
        return;
      }

      showToast(`✅ Absen Datang Berhasil: ${user.nama}`, 'success');
      setLatestScan({
        nama: user.nama,
        kelas: userRole === 'siswa' ? userKelas : (user.jabatan_kelas || 'Guru & Staff'),
        foto: user.foto || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.nama}`,
        status: statusAbsenFinal,
        waktu: timeFormatted,
        role: userRole
      });

      setLogKehadiran(prev => [newLog, ...prev]);
    }
  };

  // Load jsQR script secara dinamis & jalankan pemindaian kamera
  useEffect(() => {
    let streamInstance = null;
    let scanInterval = null;
    let isScriptLoaded = false;
    let isMounted = true;

    const videoElement = document.getElementById('webcam-video-gerbang');
    const canvasElement = document.createElement('canvas');
    const canvasCtx = canvasElement.getContext('2d', { willReadFrequently: true });

    const loadJsQR = () => {
      return new Promise((resolve) => {
        if (window.jsQR) {
          resolve(true);
          return;
        }
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.head.appendChild(script);
      });
    };

    if (isCameraActive) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
        .then(async (stream) => {
          if (!isMounted) {
            stream.getTracks().forEach(track => track.stop());
            return;
          }
          streamInstance = stream;
          if (videoElement) {
            videoElement.srcObject = stream;
          }

          isScriptLoaded = await loadJsQR();

          if (isScriptLoaded && window.jsQR && isMounted) {
            scanInterval = setInterval(() => {
              if (videoElement && videoElement.readyState === videoElement.HAVE_ENOUGH_DATA) {
                canvasElement.width = videoElement.videoWidth;
                canvasElement.height = videoElement.videoHeight;
                if (canvasElement.width > 0 && canvasElement.height > 0) {
                  canvasCtx.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
                  const imageData = canvasCtx.getImageData(0, 0, canvasElement.width, canvasElement.height);
                  const code = window.jsQR(imageData.data, imageData.width, imageData.height, {
                    inversionAttempts: 'dontInvert',
                  });

                  if (code && code.data) {
                    processAbsenData(code.data);
                  }
                }
              }
            }, 400);
          }
        })
        .catch((err) => {
          console.error("Gagal mengakses kamera:", err);
          if (isMounted) {
            showToast("Gagal membuka kamera. Perizinan browser ditolak.", "error");
            setIsCameraActive(false);
          }
        });
    }

    return () => {
      isMounted = false;
      if (scanInterval) clearInterval(scanInterval);
      if (streamInstance) {
        streamInstance.getTracks().forEach(track => track.stop());
      }
      if (videoElement && videoElement.srcObject) {
        const tracks = videoElement.srcObject.getTracks();
        tracks.forEach(track => track.stop());
        videoElement.srcObject = null;
      }
    };
  }, [isCameraActive]);

  const handleScanSubmit = (e) => {
    e.preventDefault();
    const cleanCode = rfidInput.trim();
    if (!cleanCode) return;
    processAbsenData(cleanCode);
    setRfidInput('');
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error("Error attempting to enable fullscreen:", err);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const tanggalHariIniStr = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  const logHariIni = logKehadiran.filter(l => l.tahunPelajaran === tahunPelajaranAktif && l.tanggal === tanggalHariIniStr);
  
  const guruHadir = logHariIni.filter(l => l.role === 'guru');
  const siswaHadir = logHariIni.filter(l => l.role === 'siswa');
  const siswaPulang = siswaHadir.filter(l => l.waktuPulang);
  const siswaBelumPulang = siswaHadir.length - siswaPulang.length;

  return (
    <div className={`h-screen w-screen ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-gray-100 text-gray-900'} flex flex-col justify-between p-4 overflow-hidden transition-colors`}>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scanLaser {
          0% { top: 0%; opacity: 0.8; }
          50% { opacity: 1; }
          100% { top: 98%; opacity: 0.8; }
        }
        .animate-scanLaser {
          position: absolute;
          animation: scanLaser 2s ease-in-out infinite alternate;
        }
      `}} />

      {/* HEADER ATAS */}
      <div className={`w-full flex flex-col md:flex-row justify-between items-center gap-4 ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-gray-200 shadow-sm'} px-4 md:px-6 py-4 rounded-3xl backdrop-blur-md flex-shrink-0`}>
        <div className="flex items-center gap-2 w-full md:w-auto justify-center md:justify-start">
          <button onClick={onBack} className={`${isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700' : 'bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-300'} border px-3 py-2 rounded-xl flex items-center gap-1.5 transition cursor-pointer text-xs font-bold`}>
            <ArrowLeft size={16} /> Keluar
          </button>
          <button onClick={toggleFullscreen} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-xl flex items-center gap-1.5 transition cursor-pointer text-xs font-bold shadow">
            {isFullscreen ? 'Keluar Fullscreen' : 'Fullscreen'}
          </button>
        </div>

        <div className="text-center space-y-0.5">
          <h1 className="text-xs md:text-sm font-extrabold tracking-widest uppercase text-blue-500 dark:text-blue-400">DASHBOARD PRESENSI SEKOLAH</h1>
          <div className="flex flex-col items-center">
            <h2 className="text-sm md:text-lg font-black tracking-wide">
              {infoSekolah?.nama || <span className="text-rose-500 italic font-semibold">Nama Sekolah Belum Diatur</span>}
            </h2>
            <p className="text-[11px] md:text-xs font-medium opacity-90 line-clamp-1">
              {infoSekolah?.alamat || <span className="text-amber-500 italic">Alamat Sekolah Belum Diatur</span>}
            </p>
          </div>
          <p className="text-[11px] text-emerald-500 dark:text-emerald-400 font-mono font-bold">
            TP: {tahunPelajaranAktif} &bull; Mode: {pengaturanJam?.modeAktif || 'Pagi'}
          </p>
        </div>

        <div className={`text-center md:text-right ${isDarkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-gray-50 border-gray-200'} border px-4 py-2 rounded-xl w-full md:w-auto`}>
          <p className="text-xs font-bold">{new Date().toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</p>
          <p className="text-[11px] opacity-80">Petugas: <strong className="text-emerald-500">Admin Piket</strong></p>
        </div>
      </div>
      
      {toastNotif && (
        <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-2xl text-xs font-bold shadow-2xl transition-all animate-bounce ${
          toastNotif.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
        }`}>
          {toastNotif.message}
        </div>
      )}

      {/* 3 KOLOM UTAMA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 w-full mx-auto my-auto flex-1 items-stretch py-2 overflow-hidden px-2">
        
        {/* KOTAK KIRI */}
        <div className={`lg:col-span-4 ${isDarkMode ? 'bg-slate-900/90 border-slate-800 text-slate-100' : 'bg-white border-gray-200 text-gray-900 shadow-md'} p-5 rounded-3xl border flex flex-col justify-between space-y-3`}>
          <div className="w-full flex justify-between items-center border-b border-gray-200 dark:border-slate-800 pb-2 flex-shrink-0">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-500">IDENTITAS TERBARU</h3>
            <span className="text-xs font-mono font-bold text-amber-500">{currentTime || '00:00:00 WIB'}</span>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center text-center py-2">
            {latestScan ? (
              <div className="space-y-3 w-full animate-fadeIn">
                <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-emerald-500 shadow-xl mx-auto bg-gray-100 dark:bg-slate-950">
                  <img src={latestScan.foto} alt="Foto" className="w-full h-full object-cover" />
                </div>
                <div className="space-y-0.5">
                  <span className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/40 text-[10px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider">
                    {latestScan.status}
                  </span>
                  <h3 className="text-lg font-extrabold mt-1">{latestScan.nama}</h3>
                  <p className="text-xs font-semibold text-blue-500">{latestScan.kelas}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-2 opacity-60">
                <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 flex items-center justify-center mx-auto text-blue-500 shadow-inner">
                  <ShieldCheck size={32} />
                </div>
                <h4 className="text-xs font-bold">Menunggu Scan Gerbang...</h4>
                <p className="text-[10px] max-w-xs mx-auto">Identitas siswa/guru akan tampil di sini secara real-time.</p>
              </div>
            )}
          </div>

          <div className="space-y-2.5 pt-2 border-t border-gray-200 dark:border-slate-800 flex-shrink-0">
            <div className={`${isDarkMode ? 'bg-slate-950/70 border-slate-800' : 'bg-gray-50 border-gray-200'} border p-3.5 rounded-2xl space-y-1.5`}>
              <div className="flex justify-between items-center font-bold">
                <span className="text-sm opacity-90">Hadir (Guru)</span>
                <span className="text-blue-500 font-mono text-base font-extrabold">{guruHadir.length} Orang</span>
              </div>
              <div className="flex justify-between text-xs opacity-80 pt-1.5 border-t border-gray-200 dark:border-slate-800/50">
                <span>Sudah Pulang: <strong className="opacity-100 font-bold">{guruHadir.filter(g => g.waktuPulang).length}</strong></span>
                <span>Belum Pulang: <strong className="opacity-100 font-bold">{guruHadir.length - guruHadir.filter(g => g.waktuPulang).length}</strong></span>
              </div>
            </div>

            <div className={`${isDarkMode ? 'bg-slate-950/70 border-slate-800' : 'bg-gray-50 border-gray-200'} border p-3.5 rounded-2xl space-y-2`}>
              <div className="flex justify-between items-center font-bold">
                <span className="text-sm opacity-90">Hadir (Siswa)</span>
                <span className="text-emerald-500 font-mono text-base font-extrabold">{siswaHadir.length} Orang</span>
              </div>
              <div className="flex justify-between text-xs opacity-80 pt-1.5 border-t border-gray-200 dark:border-slate-800/50">
                <span>Sudah Pulang: <strong className="opacity-100 font-bold">{siswaPulang.length}</strong></span>
                <span>Belum Pulang: <strong className="opacity-100 font-bold">{siswaBelumPulang}</strong></span>
              </div>
              <div className="grid grid-cols-3 gap-1.5 pt-1">
                <div className={`${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} border py-1.5 rounded-xl text-center text-xs font-bold`}>
                  <span className="opacity-70">Sakit: </span><span className="text-amber-500">0</span>
                </div>
                <div className={`${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} border py-1.5 rounded-xl text-center text-xs font-bold`}>
                  <span className="opacity-70">Izin: </span><span className="text-blue-500">0</span>
                </div>
                <div className={`${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} border py-1.5 rounded-xl text-center text-xs font-bold`}>
                  <span className="opacity-70">Alpa: </span><span className="text-rose-500">0</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* KOTAK TENGAH (KAMERA DENGAN KOTAK PANDUAN) */}
        <div className={`lg:col-span-4 ${isDarkMode ? 'bg-slate-900/90 border-slate-800 text-slate-100' : 'bg-white border-gray-200 text-gray-900 shadow-md'} p-5 rounded-3xl border flex flex-col justify-between space-y-4`}>
          <div className="space-y-3 flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <QrCode size={20} className="text-blue-500" />
                <h3 className="text-xs font-bold uppercase tracking-wider">KAMERA PEMINDAI QR</h3>
              </div>
              <button 
                onClick={() => setIsCameraActive(!isCameraActive)}
                className={`text-xs font-bold px-3.5 py-1.5 rounded-xl transition cursor-pointer shadow ${
                  isCameraActive ? 'bg-rose-600 hover:bg-rose-700 text-white' : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                {isCameraActive ? '🔴 Matikan Kamera' : '🟢 Nyalakan Kamera'}
              </button>
            </div>

            <div className="bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-xl flex items-center justify-center gap-2 text-emerald-400 text-xs font-bold tracking-wide">
              <span>📍</span> Posisikan QR Code di dalam kotak panduan
            </div>

            <form onSubmit={handleScanSubmit}>
              <input type="text" autoFocus value={rfidInput} onChange={(e) => setRfidInput(e.target.value)} className="opacity-0 absolute h-0 w-0" />
            </form>

            {isCameraActive ? (
              <div className="relative w-full flex-1 min-h-[250px] bg-black rounded-2xl overflow-hidden border-2 border-emerald-500 shadow-2xl flex items-center justify-center">
                <video id="webcam-video-gerbang" autoPlay playsInline muted className="absolute inset-0 w-full h-full object-cover"></video>
                
                {/* KOTAK PANDUAN SCANNER */}
                <div className="relative w-56 h-56 border-2 border-dashed border-emerald-400/80 rounded-2xl flex items-center justify-center bg-emerald-500/5 shadow-[0_0_20px_rgba(16,185,129,0.2)] pointer-events-none">
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#34d399] animate-scanLaser"></div>
                  
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-emerald-400 rounded-tl-xl"></div>
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-emerald-400 rounded-tr-xl"></div>
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-emerald-400 rounded-bl-xl"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-emerald-400 rounded-br-xl"></div>
                  
                  <span className="text-[10px] font-bold text-emerald-300/80 tracking-widest uppercase bg-slate-950/60 px-2 py-1 rounded-md">Area Scan QR</span>
                </div>
              </div>
            ) : (
              <div className="relative w-full flex-1 min-h-[250px] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex flex-col items-center justify-center text-center p-6 space-y-2">
                <ShieldCheck size={48} className="text-slate-600" />
                <p className="text-xs font-bold text-slate-400">Kamera Sedang Dimatikan</p>
                <p className="text-[10px] text-slate-500">Klik tombol hijau di atas untuk menyalakan kembali kamera pemindai.</p>
              </div>
            )}
          </div>
        </div>

        {/* KOTAK KANAN */}
        <div className={`lg:col-span-4 ${isDarkMode ? 'bg-slate-900/90 border-slate-800 text-slate-100' : 'bg-white border-gray-200 text-gray-900 shadow-md'} p-5 rounded-3xl border flex flex-col h-full`}>
          <div className="flex justify-between items-center mb-3 border-b border-gray-200 dark:border-slate-800 pb-2 flex-shrink-0">
            <h3 className="text-xs font-bold uppercase tracking-wider">
              LOG SCAN HARI INI ({logHariIni.length})
            </h3>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>

          <div className="overflow-y-auto flex-1 space-y-2.5 pr-1 max-h-[380px]">
            {logHariIni.length > 0 ? (
              logHariIni.map((item) => (
                <div key={item.id} className={`${isDarkMode ? 'bg-slate-950/70 border-slate-800' : 'bg-gray-50 border-gray-200'} border p-3 rounded-2xl flex justify-between items-center text-xs`}>
                  <div>
                    <p className="font-bold text-sm">{item.nama}</p>
                    <p className="text-xs opacity-70">{item.jabatan_kelas}</p>
                  </div>
                  <div className="text-right font-mono space-y-0.5">
                    <div className="text-[11px]">
                      <span className="opacity-70">Datang: </span>
                      <strong className="text-emerald-500">{item.waktuDatang}</strong>
                    </div>
                    {item.waktuPulang ? (
                      <div className="text-[11px]">
                        <span className="opacity-70">Pulang: </span>
                        <strong className="text-blue-500">{item.waktuPulang}</strong>
                      </div>
                    ) : (
                      <span className={`inline-block text-[9px] px-2 py-0.5 rounded font-bold ${item.status === 'Tepat Waktu' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                        {item.status}
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-50 space-y-2 py-20">
                <Clock size={32} />
                <p className="text-xs">Belum ada data presensi masuk hari ini.</p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* PENGUMUMAN */}
      <div className={`w-full ${isDarkMode ? 'bg-blue-600/10 border-blue-500/20 text-slate-300' : 'bg-blue-50 border-blue-200 text-gray-800'} border px-6 py-3.5 rounded-2xl flex items-center gap-3 text-sm flex-shrink-0 shadow-sm`}>
        <span className="bg-blue-600 text-white font-bold text-xs px-3 py-1 rounded-xl uppercase tracking-wider flex-shrink-0">PENGUMUMAN</span>
        <marquee scrollamount="6" className="text-sm md:text-base font-semibold tracking-wide">
          Selamat Datang di {infoSekolah?.nama || 'Sekolah'} &bull; Harap selalu menjaga ketertiban, kebersihan, dan mematuhi tata tertib sekolah serta melakukan scan kartu dengan tertib.
        </marquee>
      </div>

    </div>
  );
};

/* ==============================================================
   3. KOMPONEN MODE PIKET
============================================================== */
const ModePiketScreen = ({ onBack, dataGuru, dataSiswa, logKehadiran, setLogKehadiran, pengaturanJam, infoSekolah, playBeep, jadwalPiket, isDarkMode, tahunPelajaranAktif, pengaturanAudio }) => {
  const [rfidInput, setRfidInput] = useState('');
  const [lastScanned, setLastScanned] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const [showModalManual, setShowModalManual] = useState(false);
  const [modalTabManual, setModalTabManual] = useState('siswa');
  const [selectedKelasModal, setSelectedKelasModal] = useState('');

  const [toastNotif, setToastNotif] = useState(null);

  const showToast = (message, type = 'success') => {
    setToastNotif({ message, type });
    setTimeout(() => {
      setToastNotif(null);
    }, 3000);
  };

  const getInitials = (fullName) => {
    if (!fullName) return 'US';
    const cleanName = fullName.split(',')[0].trim();
    const parts = cleanName.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].substring(0, 2).toUpperCase();
  };

  const getAvatarUrl = (name) => {
    const initials = getInitials(name);
    return `https://ui-avatars.com/api/?name=${initials}&background=2563eb&color=fff&size=128&bold=true`;
  };

  const daftarKelasUnik = [...new Set(dataSiswa.map(s => s.kelasPerTP?.[tahunPelajaranAktif]).filter(Boolean))].sort();

  // AMBIL CONFIG JAM AKTIF SECARA AMAN BERDASARKAN MODE APAPUN
  const currentMode = pengaturanJam?.modeAktif || 'Pagi';
  let activeJamConfig = pengaturanJam?.pagi || { jamMasuk: '07:00', ambangTerlambat: '07:15', jamPulang: '13:00' };
  if (currentMode === 'Siang') {
    activeJamConfig = pengaturanJam?.siang || { jamMasuk: '13:30', ambangTerlambat: '13:45', jamPulang: '18:00' };
  } else if (currentMode === 'Full Day' || currentMode === 'FullDay') {
    activeJamConfig = pengaturanJam?.fullDay || { jamMasuk: '07:00', ambangTerlambat: '07:15', jamPulang: '15:30' };
  }

  const playCustomAudio = (statusType) => {
    if (pengaturanAudio && pengaturanAudio.aktif === false) return;

    let audioSrc = '';

    if (statusType === 'pulang') {
      audioSrc = pengaturanAudio?.pulang;
    } else if (statusType === 'terlambat') {
      audioSrc = pengaturanAudio?.terlambat;
    } else if (statusType === 'gagal') {
      audioSrc = pengaturanAudio?.tidakDikenal; 
    } else {
      audioSrc = pengaturanAudio?.berhasil; 
    }

    if (audioSrc) {
      const audio = new Audio(audioSrc);
      audio.volume = 1.0; 
      audio.play().catch((err) => console.log("Gagal memutar audio kustom:", err));
    }
  };

  const tanggalHariIniStr = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

  // --- MANUAL STATUS SISWA (SUPABASE SYNC) ---
  const handleManualStatusChangeSiswa = async (siswa, statusPikan) => {
    const now = new Date();
    const currentTimeStr = now.toTimeString().split(' ')[0];
    const currentTimeFormatted = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    let finalStatus = statusPikan;
    if (statusPikan === 'Hadir') {
      const ambangSiswa = activeJamConfig.ambangTerlambat.length === 5 ? `${activeJamConfig.ambangTerlambat}:00` : activeJamConfig.ambangTerlambat;
      finalStatus = currentTimeStr > ambangSiswa ? 'Terlambat' : 'Tepat Waktu';
    }

    let updatedLogs = [...logKehadiran];
    const existingIndex = updatedLogs.findIndex(
      l => l.role === 'siswa' && l.nama === siswa.nama && l.jabatan_kelas === selectedKelasModal && l.tanggal === tanggalHariIniStr && l.tahunPelajaran === tahunPelajaranAktif
    );

    if (existingIndex >= 0) {
      const targetLog = updatedLogs[existingIndex];
      const dataUpdate = {
        status: finalStatus,
        waktuDatang: ['Tepat Waktu', 'Terlambat', 'Hadir'].includes(finalStatus) 
          ? (targetLog.waktuDatang && targetLog.waktuDatang !== '-' ? targetLog.waktuDatang : currentTimeFormatted)
          : '-',
        waktuPulang: ['Tepat Waktu', 'Terlambat', 'Hadir'].includes(finalStatus) ? targetLog.waktuPulang : null
      };

      // UPDATE KE SUPABASE
      await supabase.from('log_kehadiran').update(dataUpdate).eq('id', targetLog.id);

      updatedLogs[existingIndex] = { ...targetLog, ...dataUpdate };
    } else {
      const newLog = {
        id: Date.now() + Math.floor(Math.random() * 1000),
        rfid: siswa.rfid || 'MANUAL',
        nama: siswa.nama,
        jabatan_kelas: selectedKelasModal,
        role: 'siswa',
        waktuDatang: ['Sakit', 'Izin', 'Alpa'].includes(finalStatus) ? '-' : currentTimeFormatted,
        waktuPulang: null,
        status: finalStatus,
        tanggal: tanggalHariIniStr,
        tahunPelajaran: tahunPelajaranAktif
      };

      // INSERT KE SUPABASE
      await supabase.from('log_kehadiran').insert([newLog]);

      updatedLogs.unshift(newLog);
    }

    setLogKehadiran(updatedLogs);
    showToast(`Status Siswa ${siswa.nama} diubah menjadi: ${finalStatus}`, 'success');

    if (finalStatus === 'Terlambat') {
      playCustomAudio('terlambat');
    } else if (['Hadir', 'Tepat Waktu'].includes(finalStatus)) {
      playCustomAudio('berhasil');
    }
  };

  // --- MANUAL STATUS GURU (SUPABASE SYNC) ---
  const handleManualStatusChangeGuru = async (guru, statusPikan) => {
    const now = new Date();
    const currentTimeStr = now.toTimeString().split(' ')[0];
    const currentTimeFormatted = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    let finalStatus = statusPikan;
    if (statusPikan === 'Hadir') {
      const listHariIndo = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
      const namaHariIni = listHariIndo[now.getDay()];
      const jadwalGuruHariIni = guru.jadwalMengajar?.[namaHariIni];

      if (jadwalGuruHariIni && jadwalGuruHariIni.aktif) {
        const jamMulaiGuru = jadwalGuruHariIni.jamMulai.length === 5 ? `${jadwalGuruHariIni.jamMulai}:00` : jadwalGuruHariIni.jamMulai;
        finalStatus = currentTimeStr > jamMulaiGuru ? 'Terlambat' : 'Tepat Waktu';
      } else if (jadwalGuruHariIni && !jadwalGuruHariIni.aktif) {
        finalStatus = 'Hadir (Luar Jadwal)';
      } else {
        finalStatus = currentTimeStr > '07:30:00' ? 'Terlambat' : 'Tepat Waktu';
      }
    }

    let updatedLogs = [...logKehadiran];
    const existingIndex = updatedLogs.findIndex(
      l => l.role === 'guru' && l.nama === guru.nama && l.tanggal === tanggalHariIniStr && l.tahunPelajaran === tahunPelajaranAktif
    );

    if (existingIndex >= 0) {
      const targetLog = updatedLogs[existingIndex];
      const dataUpdate = {
        status: finalStatus,
        waktuDatang: ['Tepat Waktu', 'Terlambat', 'Hadir', 'Hadir (Luar Jadwal)'].includes(finalStatus) 
          ? (targetLog.waktuDatang && targetLog.waktuDatang !== '-' ? targetLog.waktuDatang : currentTimeFormatted)
          : '-',
        waktuPulang: ['Tepat Waktu', 'Terlambat', 'Hadir', 'Hadir (Luar Jadwal)'].includes(finalStatus) ? targetLog.waktuPulang : null
      };

      // UPDATE KE SUPABASE
      await supabase.from('log_kehadiran').update(dataUpdate).eq('id', targetLog.id);

      updatedLogs[existingIndex] = { ...targetLog, ...dataUpdate };
    } else {
      const newLog = {
        id: Date.now() + Math.floor(Math.random() * 1000),
        rfid: guru.rfid || 'MANUAL',
        nama: guru.nama,
        jabatan_kelas: guru.jabatan_kelas,
        role: 'guru',
        waktuDatang: ['Sakit', 'Izin', 'Alpa'].includes(finalStatus) ? '-' : currentTimeFormatted,
        waktuPulang: null,
        status: finalStatus,
        tanggal: tanggalHariIniStr,
        tahunPelajaran: tahunPelajaranAktif
      };

      // INSERT KE SUPABASE
      await supabase.from('log_kehadiran').insert([newLog]);

      updatedLogs.unshift(newLog);
    }

    setLogKehadiran(updatedLogs);
    showToast(`Status Guru ${guru.nama} diubah menjadi: ${finalStatus}`, 'success');

    if (finalStatus === 'Terlambat') {
      playCustomAudio('terlambat');
    } else if (['Hadir', 'Tepat Waktu', 'Hadir (Luar Jadwal)'].includes(finalStatus)) {
      playCustomAudio('berhasil');
    }
  };

  // --- ABSEN PULANG MANUAL (SUPABASE SYNC) ---
  const handleAbsenPulangManual = async (wargaNama) => {
    const currentTimeFormatted = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    const existingIndex = logKehadiran.findIndex(
      log => log.nama === wargaNama && log.tanggal === tanggalHariIniStr && log.tahunPelajaran === tahunPelajaranAktif
    );

    if (existingIndex >= 0) {
      const updatedLogs = [...logKehadiran];
      const targetLog = updatedLogs[existingIndex];
      
      // UPDATE KE SUPABASE
      await supabase.from('log_kehadiran').update({ waktuPulang: currentTimeFormatted }).eq('id', targetLog.id);

      updatedLogs[existingIndex] = { ...targetLog, waktuPulang: currentTimeFormatted };
      const target = updatedLogs.splice(existingIndex, 1)[0];
      updatedLogs.unshift(target);

      setLogKehadiran(updatedLogs);
      showToast(`Berhasil mencatatkan Absen Pulang untuk: ${wargaNama} (${currentTimeFormatted})`, 'success');
      playCustomAudio('pulang');
    } else {
      showToast(`${wargaNama} belum memiliki data absen masuk hari ini!`, 'error');
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  const namaHariIni = new Date().toLocaleDateString('id-ID', { weekday: 'long' });
  const dataPiketHariIni = jadwalPiket.find(j => j.hari.toLowerCase() === namaHariIni.toLowerCase());

  const logHariIni = logKehadiran.filter(log => log.tanggal === tanggalHariIniStr && log.tahunPelajaran === tahunPelajaranAktif);
  
  const logGuruHariIni = logHariIni.filter(l => l.role === 'guru');
  const logSiswaHariIni = logHariIni.filter(l => l.role === 'siswa');

  const guruHadirCount = logGuruHariIni.filter(l => ['Tepat Waktu', 'Terlambat', 'Hadir', 'Hadir (Luar Jadwal)'].includes(l.status)).length;
  const guruSudahPulang = logGuruHariIni.filter(l => l.waktuPulang !== null).length;
  const guruBelumPulang = guruHadirCount - guruSudahPulang;

  const siswaHadirList = logSiswaHariIni.filter(l => ['Tepat Waktu', 'Terlambat', 'Hadir'].includes(l.status));
  const siswaSakitCount = logSiswaHariIni.filter(l => l.status === 'Sakit').length;
  const siswaIzinCount = logSiswaHariIni.filter(l => l.status === 'Izin').length;
  const siswaAlpaCount = logSiswaHariIni.filter(l => l.status === 'Alpa').length;

  const siswaHadirCount = siswaHadirList.length;
  const siswaSudahPulang = siswaHadirList.filter(l => l.waktuPulang !== null).length;
  const siswaBelumPulang = siswaHadirCount - siswaSudahPulang;

  // --- LOGIKA SCAN KARTU DI GERBANG PIKET (SUPABASE SYNC) ---
  const handleGateScan = async (e) => {
    if (e.key === 'Enter') {
      const scannedRfid = rfidInput.trim().toUpperCase();
      if (!scannedRfid) return;

      let user = dataGuru.find(g => g.rfid.toUpperCase() === scannedRfid);
      let userRole = 'guru';
      let userKelas = '';

      if (!user) {
        const foundSiswa = dataSiswa.find(s => s.rfid.toUpperCase() === scannedRfid);
        if (foundSiswa) {
          const statusTP = foundSiswa.statusTP?.[tahunPelajaranAktif] || 'Aktif';
          const kelasTP = foundSiswa.kelasPerTP?.[tahunPelajaranAktif];
          if (statusTP !== 'Aktif' || !kelasTP) {
            showToast(`Siswa ${foundSiswa.nama} belum terdaftar di TP ${tahunPelajaranAktif}!`, 'error');
            playCustomAudio('gagal');
            setRfidInput('');
            return;
          }
          user = foundSiswa;
          userRole = 'siswa';
          userKelas = kelasTP;
        }
      } else {
        userKelas = user.jabatan_kelas;
      }

      if (user) {
        const now = new Date();
        const currentTimeStr = now.toTimeString().split(' ')[0];
        const currentTimeFormatted = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        
        const existingLogIndex = logKehadiran.findIndex(log => log.nama === user.nama && log.tanggal === tanggalHariIniStr && log.tahunPelajaran === tahunPelajaranAktif);

        const listHariIndo = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        const namaHariIniIndo = listHariIndo[now.getDay()];

        let jamMulaiPulangConfig = activeJamConfig?.jamPulang || '12:00';
        if (userRole === 'guru' && user.jadwalMengajar?.[namaHariIniIndo]?.aktif) {
          jamMulaiPulangConfig = user.jadwalMengajar[namaHariIniIndo].jamSelesai || '15:00';
        }

        if (existingLogIndex >= 0) {
          const updatedLogs = [...logKehadiran];
          const existingLog = updatedLogs[existingLogIndex];
          const currentStatus = existingLog.status;
          
          if (['Sakit', 'Izin', 'Alpa'].includes(currentStatus)) {
            playBeep(true);
            showToast(`${user.nama} sudah tercatat dengan status "${currentStatus}" hari ini.`, 'error');
            playCustomAudio('gagal');
            setRfidInput('');
            return;
          }

          if (!existingLog.waktuPulang) {
            if (currentTimeStr >= jamMulaiPulangConfig) {
              playBeep(true);
              existingLog.waktuPulang = currentTimeFormatted;
              
              // UPDATE PULANG KE SUPABASE
              await supabase.from('log_kehadiran').update({ waktuPulang: currentTimeFormatted }).eq('id', existingLog.id);

              updatedLogs.splice(existingLogIndex, 1);
              updatedLogs.unshift(existingLog);
              
              setLogKehadiran(updatedLogs);
              setLastScanned({ ...user, jabatan_kelas: userRole === 'siswa' ? userKelas : user.jabatan_kelas, tipe: 'PULANG', waktu: currentTimeFormatted, status: 'Pulang', rfid: scannedRfid });
              showToast(`Berhasil Absen Pulang: ${user.nama}`, 'success');
              playCustomAudio('pulang');
            } else {
              playBeep(false);
              showToast(`⚠️ ${user.nama} sudah absen datang. Belum waktunya jam pulang!`, 'error');
            }
          } else {
            playBeep(true);
            updatedLogs.splice(existingLogIndex, 1);
            updatedLogs.unshift(existingLog);
            setLogKehadiran(updatedLogs);

            setLastScanned({ ...user, jabatan_kelas: userRole === 'siswa' ? userKelas : user.jabatan_kelas, tipe: 'SUDAH PULANG', waktu: existingLog.waktuPulang, status: 'Selesai', rfid: scannedRfid });
            showToast(`${user.nama} sudah melakukan presensi pulang hari ini.`, 'error');
          }
        } else {
          playBeep(true);
          let statusKehadiran = 'Tepat Waktu';

          if (userRole === 'guru') {
            const jadwalGuruHariIni = user.jadwalMengajar?.[namaHariIniIndo];
            if (jadwalGuruHariIni) {
              if (!jadwalGuruHariIni.aktif) {
                statusKehadiran = 'Hadir (Luar Jadwal)';
              } else {
                const jamMulaiGuru = jadwalGuruHariIni.jamMulai.length === 5 ? `${jadwalGuruHariIni.jamMulai}:00` : jadwalGuruHariIni.jamMulai;
                statusKehadiran = currentTimeStr > jamMulaiGuru ? 'Terlambat' : 'Tepat Waktu';
              }
            } else {
              statusKehadiran = currentTimeStr > '07:30:00' ? 'Terlambat' : 'Tepat Waktu';
            }
          } else {
            const ambangSiswa = activeJamConfig.ambangTerlambat.length === 5 ? `${activeJamConfig.ambangTerlambat}:00` : activeJamConfig.ambangTerlambat;
            statusKehadiran = currentTimeStr > ambangSiswa ? 'Terlambat' : 'Tepat Waktu';
          }

          const newLog = {
            id: Date.now() + Math.floor(Math.random() * 1000),
            rfid: user.rfid || scannedRfid,
            nama: user.nama,
            jabatan_kelas: userRole === 'siswa' ? userKelas : user.jabatan_kelas,
            role: userRole,
            waktuDatang: currentTimeFormatted,
            waktuPulang: null,
            status: statusKehadiran,
            tanggal: tanggalHariIniStr,
            tahunPelajaran: tahunPelajaranAktif
          };

          // INSERT DATANG KE SUPABASE
          await supabase.from('log_kehadiran').insert([newLog]);

          setLogKehadiran([newLog, ...logKehadiran]);
          setLastScanned({ ...user, jabatan_kelas: userRole === 'siswa' ? userKelas : user.jabatan_kelas, tipe: 'DATANG', waktu: currentTimeFormatted, status: statusKehadiran, rfid: user.rfid || scannedRfid });
          showToast(`Berhasil Absen Datang (${statusKehadiran}): ${user.nama}`, 'success');
          
          if (statusKehadiran === 'Terlambat') {
            playCustomAudio('terlambat');
          } else {
            playCustomAudio('berhasil');
          }
        }
      } else {
        showToast('Kartu RFID atau QR Code tidak dikenali!', 'error');
        playCustomAudio('gagal');
      }
      setRfidInput('');
    }
  };

  return (
    <div className={`h-screen w-screen ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-900 text-white'} flex flex-col justify-between p-5 overflow-hidden transition-colors`}>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 28s linear infinite;
        }
      `}</style>

      {/* HEADER DENGAN INFORMASI SEKOLAH */}
      <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-4 border-b border-slate-800 pb-3">
        <div className="flex flex-wrap items-center gap-2">
          <button onClick={onBack} className="bg-white/10 hover:bg-white/20 px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition cursor-pointer font-bold text-xs shadow">
            <ArrowLeft size={16} /> Keluar
          </button>
          <button onClick={toggleFullscreen} className="bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/40 px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition cursor-pointer text-xs font-bold text-blue-200">
            {isFullscreen ? 'Keluar Fullscreen' : 'Fullscreen'}
          </button>
          <button 
            onClick={() => setShowModalManual(true)} 
            className="bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/40 px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition cursor-pointer text-xs font-bold text-emerald-200 shadow">
            📋 Rekap & Absen Manual
          </button>
        </div>
        
        <div className="text-center space-y-1">
          <p className="text-[11px] font-extrabold uppercase tracking-widest text-blue-400">Dashboard Presensi Sekolah</p>
          <h1 className="text-xl md:text-2xl font-black tracking-wide text-white">{infoSekolah.nama}</h1>
          <p className="text-xs md:text-sm opacity-80">{infoSekolah.alamat || 'Alamat sekolah belum diatur'}</p>
          <p className="text-xs font-semibold text-blue-300">TP: {tahunPelajaranAktif} &bull; Mode: {pengaturanJam.modeAktif}</p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 px-5 py-3 rounded-2xl text-xs flex flex-col lg:items-end text-center lg:text-right shadow-md">
          <p className="font-bold text-white text-sm">{new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
          <p className="text-xs text-slate-300 mt-1">
            Petugas: <span className="font-bold text-blue-400">{dataPiketHariIni ? `${dataPiketHariIni.petugas1} & ${dataPiketHariIni.petugas2}` : 'Belum diatur'}</span>
          </p>
        </div>
      </div>

      {/* KONTEN UTAMA */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch max-w-[1550px] mx-auto w-full my-auto py-2">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-2xl text-center flex flex-col justify-between space-y-4">
          {toastNotif && (
            <div className={`p-2.5 rounded-xl text-xs font-bold shadow-2xl transition-all animate-bounce ${
              toastNotif.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
            }`}>
              {toastNotif.message}
            </div>
          )}

          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-600/20 text-blue-400 rounded-2xl flex items-center justify-center">
                <QrCode size={26} />
              </div>
              <div className="text-left">
                <h2 className="text-base font-bold">Scan Kartu RFID</h2>
                <p className="opacity-70 text-xs">Tap kartu Presensi Anda</p>
                <div className="text-yellow-400 font-mono font-black text-sm mt-1 flex items-center gap-1.5 tracking-wider">
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-ping"></span>
                  {currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })} WIB
                </div>
              </div>
            </div>
          </div>

          <input
            type="text"
            autoFocus
            value={rfidInput}
            onChange={(e) => setRfidInput(e.target.value)}
            onKeyDown={handleGateScan}
            className="w-full bg-slate-950 border-2 border-slate-700 rounded-2xl p-4 text-center text-lg text-white focus:outline-none focus:border-blue-500 tracking-widest font-mono"
            placeholder="[ MENUNGGU SCAN ]"
          />

          <div className="space-y-3 pt-2 text-left text-xs">
            <div className="bg-slate-800/80 border border-slate-700/60 p-3.5 rounded-2xl">
              <div className="flex justify-between items-center mb-1.5 font-bold text-sm">
                <span className="text-slate-200">Hadir (Guru)</span>
                <span className="text-blue-400 font-mono">{guruHadirCount} Orang</span>
              </div>
              <div className="flex justify-between text-xs opacity-85 border-t border-slate-700/50 pt-1.5">
                <span>Sudah Pulang: <strong className="text-emerald-400">{guruSudahPulang}</strong></span>
                <span>Belum Pulang: <strong className="text-amber-400">{guruBelumPulang}</strong></span>
              </div>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/60 p-3.5 rounded-2xl">
              <div className="flex justify-between items-center mb-1.5 font-bold text-sm">
                <span className="text-slate-200">Hadir (Siswa)</span>
                <span className="text-blue-400 font-mono">{siswaHadirCount} Orang</span>
              </div>
              <div className="flex justify-between text-xs opacity-85 border-t border-slate-700/50 pt-1.5 mb-2 pb-2 border-b border-slate-700/50">
                <span>Sudah Pulang: <strong className="text-emerald-400">{siswaSudahPulang}</strong></span>
                <span>Belum Pulang: <strong className="text-amber-400">{siswaBelumPulang}</strong></span>
              </div>
              <div className="grid grid-cols-3 gap-1.5 text-center font-bold text-xs">
                <div className="bg-blue-500/10 border border-blue-500/30 text-blue-300 py-1.5 rounded-xl">
                  Sakit: {siswaSakitCount}
                </div>
                <div className="bg-purple-500/10 border border-purple-500/30 text-purple-300 py-1.5 rounded-xl">
                  Izin: {siswaIzinCount}
                </div>
                <div className="bg-rose-500/10 border border-rose-500/30 text-rose-300 py-1.5 rounded-xl">
                  Alpa: {siswaAlpaCount}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl flex flex-col items-center justify-center text-center relative overflow-hidden">
          {lastScanned ? (
            <div className="space-y-5 animate-fade-in w-full">
              <div className="w-36 h-36 bg-slate-800 rounded-full mx-auto flex items-center justify-center border-4 border-blue-500 shadow-xl overflow-hidden">
                <img src={lastScanned.foto || getAvatarUrl(lastScanned.nama)} alt="Avatar" className="w-full h-full object-cover bg-slate-700" />
              </div>
              <div>
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                  lastScanned.status === 'Terlambat' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                  lastScanned.status === 'Tepat Waktu' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                  'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                }`}>
                  {lastScanned.tipe} - {lastScanned.status}
                </span>
                <h3 className="text-2xl font-black mt-3 text-white">{lastScanned.nama}</h3>
                <p className="text-blue-400 font-semibold text-base mt-1">{lastScanned.jabatan_kelas}</p>
              </div>
              <div className="pt-4 border-t border-slate-800 flex justify-around opacity-90 text-sm">
                <div>Waktu: <span className="text-white font-mono font-bold">{lastScanned.waktu}</span></div>
                <div>ID/QR: <span className="text-white font-mono font-bold">{lastScanned.rfid}</span></div>
              </div>
            </div>
          ) : (
            <div className="opacity-50 space-y-3">
              <ShieldCheck size={68} className="mx-auto text-blue-500" />
              <p className="text-lg font-semibold">Belum ada aktivitas scan di gerbang.</p>
              <p className="text-xs">Data identitas akan muncul di sini secara real-time.</p>
            </div>
          )}
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-2xl flex flex-col h-[460px]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-3 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping"></span> Log Scan Hari Ini ({logHariIni.length})
          </h3>
          <div className="space-y-2.5 overflow-y-auto flex-1 pr-1 text-left">
            {logHariIni.length > 0 ? (
              logHariIni.map((log, idx) => (
                <div key={idx} className="bg-slate-800/60 border border-slate-800/80 p-3 rounded-2xl flex justify-between items-center text-xs shadow-sm hover:bg-slate-800 transition">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-600/20 border border-blue-500/30 overflow-hidden flex-shrink-0">
                      <img src={getAvatarUrl(log.nama)} alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">{log.nama}</p>
                      <p className="text-[11px] text-blue-400 font-medium">{log.jabatan_kelas}</p>
                    </div>
                  </div>
                  <div className="text-right space-y-0.5">
                    <div className="text-xs">
                      <span className="opacity-60 text-[10px] mr-1">Datang:</span>
                      <span className="font-mono font-bold text-emerald-400">{log.waktuDatang}</span>
                    </div>
                    {log.waktuPulang ? (
                      <div className="text-xs">
                        <span className="opacity-60 text-[10px] mr-1">Pulang:</span>
                        <span className="font-mono font-bold text-amber-400">{log.waktuPulang}</span>
                      </div>
                    ) : (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${log.status === 'Terlambat' ? 'bg-rose-500/20 text-rose-400' : 'bg-blue-500/20 text-blue-300'}`}>
                        {log.status}
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-40 text-xs py-12">
                <p>Belum ada data presensi yang masuk hari ini.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FOOTER RUNNING TEXT */}
      <div className="bg-slate-900/95 border border-slate-800 px-5 py-3 rounded-2xl flex items-center overflow-hidden shadow-xl">
        <span className="bg-blue-600 text-white font-black px-3.5 py-1.5 rounded-xl text-xs uppercase tracking-wider mr-4 flex-shrink-0 z-10 shadow">
          PENGUMUMAN
        </span>
        <div className="overflow-hidden whitespace-nowrap w-full">
          <p className="animate-marquee font-bold text-sm md:text-base text-slate-100 tracking-wide">
            📢 Selamat Datang di <strong className="text-blue-400">{infoSekolah.nama}</strong> &bull; Harap selalu menjaga ketertiban, kebersihan, dan mematuhi tata tertib sekolah serta menggunakan atribut dengan lengkap.
          </p>
        </div>
      </div>

      {/* MODAL REKAP & ABSEN MANUAL */}
      {showModalManual && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`w-full max-w-5xl max-h-[90vh] flex flex-col rounded-3xl shadow-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-gray-200 text-gray-800'} overflow-hidden animate-fade-in`}>
            
            <div className="p-5 border-b flex justify-between items-center bg-blue-600 text-white">
              <div>
                <h3 className="text-base font-bold">Rekapitulasi Kehadiran & Absen Manual</h3>
                <p className="text-xs text-blue-100">Kelola kehadiran harian serta absen pulang untuk Siswa maupun Guru & Staff</p>
              </div>
              <button 
                onClick={() => setShowModalManual(false)} 
                className="bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-xl text-white font-bold text-xs cursor-pointer">
                ✕ Tutup
              </button>
            </div>

            {/* TAB PILIHAN: SISWA / GURU */}
            <div className={`flex border-b px-6 pt-3 gap-4 ${isDarkMode ? 'border-slate-800 bg-slate-900' : 'border-gray-200 bg-gray-50'}`}>
              <button 
                onClick={() => setModalTabManual('siswa')} 
                className={`pb-3 text-xs font-bold border-b-2 transition cursor-pointer px-4 ${modalTabManual === 'siswa' ? 'border-blue-500 text-blue-400' : 'border-transparent opacity-60'}`}>
                👨‍🎓 Absen Manual Siswa
              </button>
              <button 
                onClick={() => setModalTabManual('guru')} 
                className={`pb-3 text-xs font-bold border-b-2 transition cursor-pointer px-4 ${modalTabManual === 'guru' ? 'border-blue-500 text-blue-400' : 'border-transparent opacity-60'}`}>
                👩‍🏫 Absen Manual Guru & Staff
              </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto flex-1 text-left">
              
              {/* KONTEN TAB SISWA */}
              {modalTabManual === 'siswa' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <label className="text-xs font-bold uppercase tracking-wider">Pilih Kelas:</label>
                    <select 
                      value={selectedKelasModal} 
                      onChange={(e) => setSelectedKelasModal(e.target.value)}
                      className={`border p-2.5 rounded-xl text-xs font-semibold ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-gray-50 border-gray-300'}`}
                    >
                      <option value="">-- Pilih Kelas --</option>
                      {daftarKelasUnik.map((kls, idx) => (
                        <option key={idx} value={kls}>{kls}</option>
                      ))}
                    </select>
                  </div>

                  {selectedKelasModal ? (
                    <div className="border rounded-2xl overflow-hidden shadow-sm">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead className={`${isDarkMode ? 'bg-slate-800 text-slate-200' : 'bg-gray-100 text-gray-700'} uppercase font-bold`}>
                          <tr>
                            <th className="p-3">No</th>
                            <th className="p-3">Nama Siswa</th>
                            <th className="p-3 text-center">Status Masuk</th>
                            <th className="p-3 text-center">Jam Pulang</th>
                            <th className="p-3 text-center">Ubah Keterangan / Absen Pulang</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700/30">
                          {dataSiswa
                            .filter(s => s.kelasPerTP?.[tahunPelajaranAktif] === selectedKelasModal && (s.statusTP?.[tahunPelajaranAktif] || 'Aktif') === 'Aktif')
                            .sort((a, b) => a.nama.localeCompare(b.nama))
                            .map((siswa, idx) => {
                              const logSiswa = logKehadiran.find(
                                l => l.role === 'siswa' && l.nama === siswa.nama && l.jabatan_kelas === selectedKelasModal && l.tanggal === tanggalHariIniStr && l.tahunPelajaran === tahunPelajaranAktif
                              );
                              const statusHariIni = logSiswa ? logSiswa.status : 'Belum Absen';
                              const waktuPulangVal = logSiswa ? logSiswa.waktuPulang : null;
                              const sudahHadir = logSiswa && ['Tepat Waktu', 'Terlambat', 'Hadir'].includes(logSiswa.status);

                              return (
                                <tr key={siswa.id || idx} className={`${isDarkMode ? 'hover:bg-slate-800/50' : 'hover:bg-gray-50'}`}>
                                  <td className="p-3 font-mono">{idx + 1}</td>
                                  <td className="p-3 font-bold">{siswa.nama}</td>
                                  <td className="p-3 text-center">
                                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                                      ['Tepat Waktu', 'Hadir'].includes(statusHariIni) ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                                      statusHariIni === 'Terlambat' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                                      statusHariIni === 'Sakit' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                                      statusHariIni === 'Izin' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                                      statusHariIni === 'Alpa' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                                      'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                                    }`}>
                                      {statusHariIni}
                                    </span>
                                  </td>
                                  <td className="p-3 text-center font-mono font-bold text-amber-400">
                                    {waktuPulangVal ? waktuPulangVal : '-'}
                                  </td>
                                  <td className="p-3 text-center flex items-center justify-center gap-1.5 flex-wrap">
                                    <button onClick={() => handleManualStatusChangeSiswa(siswa, 'Hadir')} className="px-2.5 py-1 bg-emerald-600/30 hover:bg-emerald-600 text-emerald-200 hover:text-white rounded-lg font-semibold text-[10px] transition cursor-pointer">Hadir</button>
                                    <button onClick={() => handleManualStatusChangeSiswa(siswa, 'Sakit')} className="px-2.5 py-1 bg-blue-600/30 hover:bg-blue-600 text-blue-200 hover:text-white rounded-lg font-semibold text-[10px] transition cursor-pointer">Sakit</button>
                                    <button onClick={() => handleManualStatusChangeSiswa(siswa, 'Izin')} className="px-2.5 py-1 bg-purple-600/30 hover:bg-purple-600 text-purple-200 hover:text-white rounded-lg font-semibold text-[10px] transition cursor-pointer">Izin</button>
                                    <button onClick={() => handleManualStatusChangeSiswa(siswa, 'Alpa')} className="px-2.5 py-1 bg-rose-600/30 hover:bg-rose-600 text-rose-200 hover:text-white rounded-lg font-semibold text-[10px] transition cursor-pointer">Alpa</button>
                                    
                                    {sudahHadir && !waktuPulangVal && (
                                      <button onClick={() => handleAbsenPulangManual(siswa.nama)} className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold text-[10px] transition cursor-pointer shadow">
                                        Pulang
                                      </button>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-12 opacity-50 text-xs">
                      <p>Silakan pilih kelas terlebih dahulu untuk melihat daftar kehadiran harian siswa.</p>
                    </div>
                  )}
                </div>
              )}

              {/* KONTEN TAB GURU & STAFF */}
              {modalTabManual === 'guru' && (
                <div className="space-y-4">
                  <div className="border rounded-2xl overflow-hidden shadow-sm">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead className={`${isDarkMode ? 'bg-slate-800 text-slate-200' : 'bg-gray-100 text-gray-700'} uppercase font-bold`}>
                        <tr>
                          <th className="p-3">No</th>
                          <th className="p-3">Nama Guru & Staff</th>
                          <th className="p-3">Jabatan</th>
                          <th className="p-3 text-center">Status Masuk</th>
                          <th className="p-3 text-center">Jam Pulang</th>
                          <th className="p-3 text-center">Ubah Keterangan / Absen Pulang</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700/30">
                        {dataGuru
                          .slice()
                          .sort((a, b) => a.nama.localeCompare(b.nama))
                          .map((guru, idx) => {
                            const logGuru = logKehadiran.find(
                              l => l.role === 'guru' && l.nama === guru.nama && l.tanggal === tanggalHariIniStr && l.tahunPelajaran === tahunPelajaranAktif
                            );
                            const statusGuruHariIni = logGuru ? logGuru.status : 'Belum Absen';
                            const waktuPulangGuruVal = logGuru ? logGuru.waktuPulang : null;
                            const sudahHadirGuru = logGuru && ['Tepat Waktu', 'Terlambat', 'Hadir', 'Hadir (Luar Jadwal)'].includes(logGuru.status);

                            return (
                              <tr key={guru.id || idx} className={`${isDarkMode ? 'hover:bg-slate-800/50' : 'hover:bg-gray-50'}`}>
                                <td className="p-3 font-mono">{idx + 1}</td>
                                <td className="p-3 font-bold">{guru.nama}</td>
                                <td className="p-3 text-blue-400 font-medium">{guru.jabatan_kelas}</td>
                                <td className="p-3 text-center">
                                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                                    ['Tepat Waktu', 'Hadir', 'Hadir (Luar Jadwal)'].includes(statusGuruHariIni) ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                                    statusGuruHariIni === 'Terlambat' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                                    statusGuruHariIni === 'Sakit' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                                    statusGuruHariIni === 'Izin' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                                    statusGuruHariIni === 'Alpa' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                                    'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                                  }`}>
                                    {statusGuruHariIni}
                                  </span>
                                </td>
                                <td className="p-3 text-center font-mono font-bold text-amber-400">
                                  {waktuPulangGuruVal ? waktuPulangGuruVal : '-'}
                                </td>
                                <td className="p-3 text-center flex items-center justify-center gap-1.5 flex-wrap">
                                  <button onClick={() => handleManualStatusChangeGuru(guru, 'Hadir')} className="px-2.5 py-1 bg-emerald-600/30 hover:bg-emerald-600 text-emerald-200 hover:text-white rounded-lg font-semibold text-[10px] transition cursor-pointer">Hadir</button>
                                  <button onClick={() => handleManualStatusChangeGuru(guru, 'Sakit')} className="px-2.5 py-1 bg-blue-600/30 hover:bg-blue-600 text-blue-200 hover:text-white rounded-lg font-semibold text-[10px] transition cursor-pointer">Sakit</button>
                                  <button onClick={() => handleManualStatusChangeGuru(guru, 'Izin')} className="px-2.5 py-1 bg-purple-600/30 hover:bg-purple-600 text-purple-200 hover:text-white rounded-lg font-semibold text-[10px] transition cursor-pointer">Izin</button>
                                  <button onClick={() => handleManualStatusChangeGuru(guru, 'Alpa')} className="px-2.5 py-1 bg-rose-600/30 hover:bg-rose-600 text-rose-200 hover:text-white rounded-lg font-semibold text-[10px] transition cursor-pointer">Alpa</button>
                                  
                                  {sudahHadirGuru && !waktuPulangGuruVal && (
                                    <button onClick={() => handleAbsenPulangManual(guru.nama)} className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold text-[10px] transition cursor-pointer shadow">
                                      Pulang
                                    </button>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

/* ==============================================================
   4. KOMPONEN MODE INFO SEKOLAH (LAYAR TV & RUNNING TEXT)
============================================================== */
const ModeInfoSekolahTV = ({ onBack, infoSekolah, tahunPelajaranAktif }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isFullscreen, setIsFullscreen] = useState(false);

  // State lokal khusus TV agar bisa fetch mandiri ke Supabase
  const [logKehadiran, setLogKehadiran] = useState([]);
  const [dataGuru, setDataGuru] = useState([]);
  const [dataSiswa, setDataSiswa] = useState([]);

  // --- AMBIL DATA MANDIRI DARI SUPABASE UNTUK LAYAR TV ---
  useEffect(() => {
    const ambilDataTV = async () => {
      const { data: logData } = await supabase.from('log_kehadiran').select('*');
      if (logData) setLogKehadiran(logData);

      const { data: guruData } = await supabase.from('guru').select('*');
      if (guruData) setDataGuru(guruData);

      const { data: siswaData } = await supabase.from('siswa').select('*');
      if (siswaData) setDataSiswa(siswaData);
    };

    ambilDataTV();

    // Auto-refresh data setiap 10 detik agar layar TV selalu update otomatis
    const interval = setInterval(ambilDataTV, 10000);
    return () => clearInterval(interval);
  }, []);
  // ------------------------------------------------------

  // Timer jam digital real-time
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Handler Fullscreen Listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Fungsi masuk fullscreen
  const enterFullscreen = () => {
    if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(err => {
        console.log(`Gagal masuk fullscreen: ${err.message}`);
      });
    }
  };

  // Fungsi keluar fullscreen
  const exitFullscreen = () => {
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(err => {
        console.log(err);
      });
    }
  };

  const tanggalHariIniStr = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

  const totalHadirGuru = logKehadiran.filter(l => l.role === 'guru' && l.status !== 'Izin' && l.status !== 'Sakit' && l.status !== 'Alpa' && l.tahunPelajaran === tahunPelajaranAktif && l.tanggal === tanggalHariIniStr).length;
  const totalHadirSiswa = logKehadiran.filter(l => l.role === 'siswa' && l.status !== 'Izin' && l.status !== 'Sakit' && l.tahunPelajaran === tahunPelajaranAktif && l.tanggal === tanggalHariIniStr).length;
  const totalTerlambat = logKehadiran.filter(l => l.status === 'Terlambat' && l.tahunPelajaran === tahunPelajaranAktif && l.tanggal === tanggalHariIniStr).length;
  
  const totalSiswaAktifTP = dataSiswa.filter(s => (s.statusTP?.[tahunPelajaranAktif] || 'Aktif') === 'Aktif' && s.kelasPerTP?.[tahunPelajaranAktif]).length;

  // Mengambil daftar seluruh kelas unik yang aktif pada Tahun Pelajaran ini
  const daftarKelasAktif = [...new Set(
    dataSiswa
      .filter(s => (s.statusTP?.[tahunPelajaranAktif] || 'Aktif') === 'Aktif' && s.kelasPerTP?.[tahunPelajaranAktif])
      .map(s => s.kelasPerTP[tahunPelajaranAktif])
  )].sort();

  // Log siswa yang hadir hari ini pada TP aktif
  const logSiswaHadirHariIni = logKehadiran.filter(l => 
    l.role === 'siswa' && 
    l.status !== 'Izin' && 
    l.status !== 'Sakit' && 
    l.tahunPelajaran === tahunPelajaranAktif &&
    l.tanggal === tanggalHariIniStr
  );

  return (
    <div className="min-h-screen w-full bg-slate-950 flex flex-col justify-between p-3 md:p-6 text-white overflow-y-auto md:overflow-hidden fixed inset-0 z-50">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-running-text {
          display: inline-block;
          white-space: nowrap;
          animation: marquee 25s linear infinite;
        }
      `}} />

      {/* HEADER: KIRI (NAVIGASI & FULLSCREEN), TENGAH (INFO SEKOLAH), KANAN (JAM) */}
      <div className="flex flex-col md:flex-row justify-between items-center border-b border-slate-800 pb-4 gap-4 px-2">
        
        {/* KIRI: TOMBOL KEMBALI & FULLSCREEN */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 w-full md:w-auto">
          <button 
            onClick={onBack}
            className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-2 rounded-xl flex items-center gap-1.5 transition text-xs font-semibold cursor-pointer shadow-md"
          >
            <ArrowLeft size={16} /> Kembali
          </button>

          {!isFullscreen ? (
            <button 
              onClick={enterFullscreen}
              className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-xl font-bold flex items-center gap-1.5 shadow-lg transition cursor-pointer text-xs hidden md:flex"
              title="Tampilkan Layar Penuh untuk TV Lobi"
            >
              <Tv size={16} /> Fullscreen
            </button>
          ) : (
            <button 
              onClick={exitFullscreen}
              className="bg-rose-600 hover:bg-rose-700 text-white px-3 py-2 rounded-xl font-bold flex items-center gap-1.5 shadow-lg transition cursor-pointer text-xs animate-pulse hidden md:flex"
            >
              <X size={16} /> Keluar
            </button>
          )}
        </div>

        {/* TENGAH: INFO SEKOLAH */}
        <div className="flex items-center gap-3 text-center md:text-left">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-600 rounded-2xl flex items-center justify-center overflow-hidden shadow-xl shadow-blue-600/40 flex-shrink-0 border-2 border-white/20">
            {infoSekolah.logo ? <img src={infoSekolah.logo} alt="Logo" className="w-full h-full object-cover" /> : <School size={28} />}
          </div>
          <div>
            <h1 className="text-lg md:text-2xl font-black tracking-wider uppercase text-blue-400 leading-tight">{infoSekolah.nama}</h1>
            <p className="text-[10px] md:text-xs text-slate-300 font-semibold tracking-wide mt-0.5">SISTEM INFORMASI KEHADIRAN &bull; TP {tahunPelajaranAktif}</p>
          </div>
        </div>

        {/* KANAN: JAM DIGITAL */}
        <div className="text-center md:text-right bg-slate-900/90 border border-slate-800 px-4 py-2 rounded-xl shadow-xl w-full md:w-auto">
          <div className="text-yellow-400 font-mono font-black text-lg md:text-xl tracking-wider flex items-center justify-center md:justify-end gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-ping"></span>
            {currentTime.toLocaleTimeString('id-ID')}
          </div>
          <p className="text-[10px] text-slate-400 font-medium">{currentTime.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</p>
        </div>

      </div>

      {/* KONTEN UTAMA */}
      <div className="space-y-4 my-auto max-w-7xl mx-auto w-full py-4 px-1">
        
        {/* 3 KOTAK STATISTIK UTAMA */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900/90 border border-slate-800 p-5 md:p-8 rounded-2xl md:rounded-3xl text-center space-y-1 shadow-2xl backdrop-blur">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Guru Hadir Hari Ini</p>
            <h3 className="text-4xl md:text-6xl font-black text-blue-400 py-1">{totalHadirGuru}</h3>
            <p className="text-[11px] text-slate-400 font-medium">Dari total {dataGuru.length} Guru & Staff</p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-5 md:p-8 rounded-2xl md:rounded-3xl text-center space-y-1 shadow-2xl backdrop-blur">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Siswa Hadir Hari Ini</p>
            <h3 className="text-4xl md:text-6xl font-black text-emerald-400 py-1">{totalHadirSiswa}</h3>
            <p className="text-[11px] text-slate-400 font-medium">Dari total {totalSiswaAktifTP} Siswa Aktif</p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-5 md:p-8 rounded-2xl md:rounded-3xl text-center space-y-1 shadow-2xl backdrop-blur">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Tercatat Terlambat</p>
            <h3 className="text-4xl md:text-6xl font-black text-rose-400 py-1">{totalTerlambat}</h3>
            <p className="text-[11px] text-slate-400 font-medium">Warga sekolah melewati jam masuk</p>
          </div>
        </div>

        {/* KOTAK REKAP KEHADIRAN SISWA PER KELAS */}
        <div className="bg-slate-900/95 border border-slate-800 p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-2xl">
          <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-3 flex items-center gap-2">
            <Layers size={16} /> Rekap Kehadiran Siswa Per Kelas Hari Ini
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 max-h-[180px] md:max-h-[220px] overflow-y-auto pr-1">
            {daftarKelasAktif.length > 0 ? (
              daftarKelasAktif.map((namaKelas, idx) => {
                const totalSiswaDiKelas = dataSiswa.filter(s => 
                  (s.statusTP?.[tahunPelajaranAktif] || 'Aktif') === 'Aktif' && 
                  s.kelasPerTP?.[tahunPelajaranAktif] === namaKelas
                ).length;

                const siswaHadirDiKelas = logSiswaHadirHariIni.filter(l => l.jabatan_kelas === namaKelas).length;

                return (
                  <div key={idx} className="bg-slate-800/80 border border-slate-700/70 p-3 rounded-xl flex flex-col justify-between text-left shadow-md">
                    <span className="font-bold text-xs md:text-sm text-slate-100 truncate">{namaKelas}</span>
                    <div className="flex justify-between items-baseline pt-1.5 border-t border-slate-700/60 mt-1.5">
                      <span className="text-[10px] text-slate-400">Hadir:</span>
                      <span className="font-mono text-xs font-bold text-emerald-400">
                        {siswaHadirDiKelas} <span className="text-[10px] text-slate-400 font-normal">/ {totalSiswaDiKelas}</span>
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full text-center text-slate-500 text-xs py-4">
                Belum ada data kelas atau siswa yang terdaftar di tahun pelajaran ini.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RUNNING TEXT */}
      <div className="bg-blue-900/50 border border-blue-500/40 rounded-xl md:rounded-2xl p-3 overflow-hidden relative flex items-center shadow-xl mt-2">
        <div className="bg-blue-600 text-white text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider mr-3 flex-shrink-0 z-10 shadow">
          Pengumuman
        </div>
        <div className="overflow-hidden w-full relative">
          <p className="animate-running-text text-blue-200 text-xs md:text-sm font-bold tracking-wide">
            {infoSekolah.pengumuman || 'Selamat datang di lingkungan sekolah. Harap selalu menjaga kebersihan dan ketertiban.'}
          </p>
        </div>
      </div>
    </div>
  );

/* ==============================================================
   5. KOMPONEN TAHUN PELAJARAN & MANAJEMEN KENAIKAN KELAS
============================================================== */
const KontenTahunPelajaran = ({ tahunPelajaranAktif, setTahunPelajaranAktif, daftarTahunPelajaran, setDaftarTahunPelajaran, dataSiswa, setDataSiswa, logKehadiran, setLogKehadiran, dataPelanggaran, setDataPelanggaran, dataPerizinan, setDataPerizinan, arsipAbsensi, setArsipAbsensi, isDarkMode }) => {
  const [newTpInput, setNewTpInput] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isKenaikanModalOpen, setIsKenaikanModalOpen] = useState(false);

  const [targetTpAsal, setTargetTpAsal] = useState(tahunPelajaranAktif);
  const [targetTpTujuan, setTargetTpTujuan] = useState('');
  const [selectedKelasNaik, setSelectedKelasNaik] = useState('Semua');
  const [siswaKenaikanList, setSiswaKenaikanList] = useState([]);

  const handleAddTp = (e) => {
    e.preventDefault();
    const cleanTp = newTpInput.trim();
    if (!cleanTp) return;
    if (daftarTahunPelajaran.includes(cleanTp)) {
      alert('Tahun pelajaran tersebut sudah ada di dalam daftar!');
      return;
    }
    setDaftarTahunPelajaran([...daftarTahunPelajaran, cleanTp]);
    setNewTpInput('');
    setIsAddModalOpen(false);
    alert(`Berhasil menambahkan tahun pelajaran ${cleanTp}!`);
  };

  const handleBukaWizardKenaikan = () => {
    const currentIndex = daftarTahunPelajaran.indexOf(tahunPelajaranAktif);
    const tpTujuanSaran = currentIndex >= 0 && currentIndex < daftarTahunPelajaran.length - 1 ? daftarTahunPelajaran[currentIndex + 1] : '';
    
    setTargetTpAsal(tahunPelajaranAktif);
    setTargetTpTujuan(tpTujuanSaran);
    setSelectedKelasNaik('Semua');

    const listSiswa = dataSiswa
      .filter(s => (s.statusTP?.[tahunPelajaranAktif] || 'Aktif') === 'Aktif' && s.kelasPerTP?.[tahunPelajaranAktif])
      .map(s => {
        const kelasLama = s.kelasPerTP[tahunPelajaranAktif];
        let kelasPrediksi = kelasLama;
        let statusPrediksi = 'Aktif';

        if (kelasLama.startsWith('X ')) kelasPrediksi = kelasLama.replace('X ', 'XI ');
        else if (kelasLama.startsWith('XI ')) kelasPrediksi = kelasLama.replace('XI ', 'XII ');
        else if (kelasLama.startsWith('XII ')) {
          kelasPrediksi = 'Alumni';
          statusPrediksi = 'Lulus';
        }

        return {
          id: s.id,
          nama: s.nama,
          kelasLama,
          kelasBaru: kelasPrediksi,
          statusBaru: statusPrediksi
        };
      });

    setSiswaKenaikanList(listSiswa);
    setIsKenaikanModalOpen(true);
  };

  const handleSimpanKenaikanKelas = (e) => {
    e.preventDefault();
    if (!targetTpTujuan) {
      alert('Mohon tentukan Tahun Pelajaran Tujuan terlebih dahulu!');
      return;
    }

    const updatedSiswa = dataSiswa.map(siswa => {
      const match = siswaKenaikanList.find(item => item.id === siswa.id);
      if (match) {
        const existingKelasPerTP = siswa.kelasPerTP || {};
        const existingStatusTP = siswa.statusTP || {};

        let statusFinal = 'Aktif';
        if (match.statusBaru === 'Tidak Naik') statusFinal = 'Tidak Naik';
        else if (match.statusBaru === 'Lulus') statusFinal = 'Lulus';

        return {
          ...siswa,
          kelasPerTP: {
            ...existingKelasPerTP,
            [targetTpTujuan]: match.statusBaru === 'Tidak Naik' ? match.kelasLama : match.kelasBaru
          },
          statusTP: {
            ...existingStatusTP,
            [targetTpTujuan]: statusFinal
          }
        };
      }
      return siswa;
    });

    setDataSiswa(updatedSiswa);
    setIsKenaikanModalOpen(false);
    setTahunPelajaranAktif(targetTpTujuan);
    alert(`Berhasil! Data siswa untuk Tahun Pelajaran ${targetTpTujuan} telah digenerate. TP Aktif dialihkan ke ${targetTpTujuan}.`);
  };

  const handleResetDataTP = (tpTarget) => {
    if (window.confirm(`PERHATIAN! Apakah Anda yakin ingin mereset/menghapus seluruh data (absensi, pelanggaran, perizinan, dan kelas siswa) khusus untuk Tahun Pelajaran ${tpTarget}? Data di tahun pelajaran lain TETAP AMAN.`)) {
      setLogKehadiran(logKehadiran.filter(l => l.tahunPelajaran !== tpTarget));
      setDataPelanggaran(dataPelanggaran.filter(p => p.tahunPelajaran !== tpTarget));
      setDataPerizinan(dataPerizinan.filter(pr => pr.tahunPelajaran !== tpTarget));
      setArsipAbsensi(arsipAbsensi.filter(a => a.tahunPelajaran !== tpTarget));
      setDataSiswa(dataSiswa.map(siswa => {
        const newKelasPerTP = { ...(siswa.kelasPerTP || {}) };
        const newStatusTP = { ...(siswa.statusTP || {}) };
        delete newKelasPerTP[tpTarget];
        delete newStatusTP[tpTarget];
        return {
          ...siswa,
          kelasPerTP: newKelasPerTP,
          statusTP: newStatusTP
        };
      }));

      alert(`Berhasil! Data untuk Tahun Pelajaran ${tpTarget} telah dibersihkan.`);
    }
  };

  const handleHapusTP = (tpTarget) => {
    if (tpTarget === tahunPelajaranAktif) {
      alert(`Tidak dapat menghapus Tahun Pelajaran ${tpTarget} karena sedang aktif! Silakan aktifkan TP lain terlebih dahulu.`);
      return;
    }

    if (daftarTahunPelajaran.length <= 1) {
      alert('Minimal harus tersisa 1 Tahun Pelajaran di dalam sistem!');
      return;
    }

    const konfirmasi = window.prompt(`PERINGATAN KERAS! Menghapus TP ${tpTarget} akan menghilangkan tahun ini dari daftar pilihan. Ketik "${tpTarget}" untuk mengonfirmasi penghapusan:`);
    if (konfirmasi === tpTarget) {
      setLogKehadiran(logKehadiran.filter(l => l.tahunPelajaran !== tpTarget));
      setDataPelanggaran(dataPelanggaran.filter(p => p.tahunPelajaran !== tpTarget));
      setDataPerizinan(dataPerizinan.filter(pr => pr.tahunPelajaran !== tpTarget));
      setArsipAbsensi(arsipAbsensi.filter(a => a.tahunPelajaran !== tpTarget));
      setDataSiswa(dataSiswa.map(siswa => {
        const newKelasPerTP = { ...(siswa.kelasPerTP || {}) };
        const newStatusTP = { ...(siswa.statusTP || {}) };
        delete newKelasPerTP[tpTarget];
        delete newStatusTP[tpTarget];
        return {
          ...siswa,
          kelasPerTP: newKelasPerTP,
          statusTP: newStatusTP
        };
      }));

      setDaftarTahunPelajaran(daftarTahunPelajaran.filter(tp => tp !== tpTarget));
      alert(`Tahun Pelajaran ${tpTarget} berhasil dihapus dari sistem.`);
    } else if (konfirmasi !== null) {
      alert('Konfirmasi pengetikan salah! Penghapusan dibatalkan.');
    }
  };

  const daftarKelasAsal = ['Semua', ...new Set(dataSiswa.map(s => s.kelasPerTP?.[tahunPelajaranAktif]).filter(Boolean))];

  const siswaFilteredWizard = selectedKelasNaik === 'Semua' 
    ? siswaKenaikanList 
    : siswaKenaikanList.filter(s => s.kelasLama === selectedKelasNaik);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className={`${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-gray-100 text-gray-800'} p-6 rounded-xl shadow-sm border flex flex-col md:flex-row justify-between items-center gap-4`}>
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Layers className="text-blue-600" /> Modul Tahun Pelajaran & Kenaikan Kelas Profesional
          </h3>
          <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Kelola tahun ajaran aktif, jalankan kenaikan kelas, dan hapus/reset data spesifik per tahun pelajaran.</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-medium flex items-center gap-2 shadow transition cursor-pointer text-sm whitespace-nowrap flex-1 md:flex-none justify-center"
          >
            <Plus size={18} /> Tambah TP
          </button>
          <button 
            onClick={handleBukaWizardKenaikan}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2.5 rounded-xl font-medium flex items-center gap-2 shadow transition cursor-pointer text-sm whitespace-nowrap flex-1 md:flex-none justify-center"
          >
            <ArrowUpRight size={18} /> Proses Kenaikan Kelas
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-gray-100 text-gray-800'} p-6 rounded-xl shadow-sm border space-y-4`}>
          <h4 className="font-bold flex items-center gap-2">
            <Calendar className="text-blue-500" /> Daftar Tahun Pelajaran & Aksi Manajemen
          </h4>
          <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
            Anda dapat mengganti TP aktif, mereset data di dalamnya, atau menghapus TP yang sudah tidak terpakai agar tidak menumpuk.
          </p>
          <div className="space-y-3 pt-2">
            {daftarTahunPelajaran.map((tp) => {
              const countSiswaAktif = dataSiswa.filter(s => (s.statusTP?.[tp] || 'Aktif') === 'Aktif' && s.kelasPerTP?.[tp]).length;
              const isAktif = tahunPelajaranAktif === tp;
              return (
                <div 
                  key={tp} 
                  className={`p-4 rounded-xl border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 transition ${
                    isAktif 
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md font-bold' 
                      : `${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-200'}`
                  }`}
                >
                  <div onClick={() => setTahunPelajaranAktif(tp)} className="cursor-pointer flex-1">
                    <span>Tahun Pelajaran {tp}</span>
                    <p className={`text-[11px] ${isAktif ? 'text-blue-100' : 'text-gray-400'}`}>{countSiswaAktif} Siswa terdaftar pada TP ini</p>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {isAktif && (
                      <span className="bg-white/20 px-2.5 py-0.5 rounded-full text-xs uppercase tracking-wider">Aktif</span>
                    )}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleResetDataTP(tp);
                      }}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition cursor-pointer ${
                        isAktif ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'bg-orange-500/10 text-orange-500 hover:bg-orange-500/20'
                      }`}
                      title={`Reset/Hapus data khusus Tahun Pelajaran ${tp}`}
                    >
                      <RefreshCw size={12} /> Reset TP
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleHapusTP(tp);
                      }}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition cursor-pointer ${
                        isAktif ? 'bg-red-800 text-white hover:bg-red-900' : 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
                      }`}
                      title={`Hapus Tahun Pelajaran ${tp} secara permanen`}
                    >
                      <Trash2 size={12} /> Hapus TP
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={`${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-gray-100 text-gray-800'} p-6 rounded-xl shadow-sm border space-y-4 flex flex-col justify-between`}>
          <div className="space-y-3">
            <h4 className="font-bold flex items-center gap-2 text-orange-500">
              <UserCheck size={20} /> Pengamanan Data & Isolasi TP
            </h4>
            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'} leading-relaxed`}>
              Sistem telah dikonfigurasi agar kenaikan kelas dari satu tahun (misal 2026/2027) ke tahun berikutnya (2027/2028) **hanya mengisi tahun tujuan tersebut**, sehingga tahun-tahun setelahnya tetap bersih.
            </p>
            <div className={`p-4 rounded-xl text-xs space-y-1 border ${isDarkMode ? 'bg-blue-950/30 border-blue-900/50 text-blue-200' : 'bg-blue-50 border-blue-200 text-blue-800'}`}>
              <p className="font-bold">Panduan Tombol Baru:</p>
              <p>&bull; <span className="font-semibold">Reset TP</span>: Membersihkan isi data di TP tersebut tanpa menghapus nama TP-nya.</p>
              <p>&bull; <span className="font-semibold">Hapus TP</span>: Menghapus nama TP beserta seluruh data di dalamnya secara permanen dari sistem agar tidak menumpuk.</p>
            </div>
          </div>

          <div className="pt-4">
            <button 
              onClick={handleBukaWizardKenaikan}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 shadow transition cursor-pointer text-sm"
            >
              <ArrowUpRight size={18} /> Buka Wizard Kenaikan Kelas Interaktif
            </button>
          </div>
        </div>
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className={`${isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white text-gray-800'} w-full max-w-md rounded-2xl shadow-xl overflow-hidden`}>
            <div className={`flex justify-between p-6 border-b ${isDarkMode ? 'border-slate-800' : 'border-gray-100'}`}>
              <h3 className="font-bold">Tambah Tahun Pelajaran Baru</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="cursor-pointer"><X size={20}/></button>
            </div>
            <form onSubmit={handleAddTp}>
              <div className="p-6 space-y-4">
                <div>
                  <label className={`block text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-gray-500'} uppercase tracking-wider mb-1`}>Format Tahun Pelajaran</label>
                  <input 
                    type="text" 
                    required 
                    value={newTpInput} 
                    onChange={(e) => setNewTpInput(e.target.value)} 
                    className={`w-full border rounded-lg p-2.5 text-sm ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : ''}`} 
                    placeholder="Contoh: 2029/2030" 
                  />
                </div>
              </div>
              <div className={`p-6 border-t ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-gray-50'} flex justify-end gap-3 rounded-b-2xl`}>
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 rounded-lg text-sm cursor-pointer">Batal</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg flex gap-2 text-sm font-medium cursor-pointer"><CheckCircle size={18}/> Simpan TP</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isKenaikanModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className={`${isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white text-gray-800'} w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]`}>
            <div className="bg-blue-600 p-6 text-white flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <ArrowUpRight size={22} /> Wizard Kenaikan Kelas Interaktif
                </h3>
                <p className="text-xs text-blue-100 mt-0.5">Tentukan TP Asal, TP Tujuan, serta atur status kenaikan per kelas atau persiswa.</p>
              </div>
              <button onClick={() => setIsKenaikanModalOpen(false)} className="text-white/80 hover:text-white p-2 rounded-lg bg-white/10 hover:bg-white/20 transition cursor-pointer"><X size={20}/></button>
            </div>

            <form onSubmit={handleSimpanKenaikanKelas} className="flex flex-col flex-1 overflow-hidden">
              <div className={`p-6 border-b grid grid-cols-1 md:grid-cols-3 gap-4 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-gray-50 border-gray-100'}`}>
                <div>
                  <label className={`block text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-gray-500'} uppercase tracking-wider mb-1`}>Dari Tahun Pelajaran (Asal)</label>
                  <select 
                    value={targetTpAsal} 
                    onChange={(e) => setTargetTpAsal(e.target.value)}
                    className={`w-full border p-2.5 rounded-xl text-sm font-semibold ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white'}`}
                  >
                    {daftarTahunPelajaran.map(tp => <option key={tp} value={tp}>TP {tp}</option>)}
                  </select>
                </div>
                <div>
                  <label className={`block text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-gray-500'} uppercase tracking-wider mb-1`}>Ke Tahun Pelajaran (Tujuan)</label>
                  <select 
                    value={targetTpTujuan} 
                    onChange={(e) => setTargetTpTujuan(e.target.value)}
                    required
                    className={`w-full border p-2.5 rounded-xl text-sm font-semibold ${isDarkMode ? 'bg-slate-800 border-slate-700 text-blue-400' : 'bg-blue-50 border-blue-200 text-blue-700'}`}
                  >
                    <option value="">-- Pilih TP Tujuan --</option>
                    {daftarTahunPelajaran.map(tp => <option key={tp} value={tp}>TP {tp}</option>)}
                  </select>
                </div>
                <div>
                  <label className={`block text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-gray-500'} uppercase tracking-wider mb-1`}>Filter Per Kelas</label>
                  <select 
                    value={selectedKelasNaik} 
                    onChange={(e) => setSelectedKelasNaik(e.target.value)}
                    className={`w-full border p-2.5 rounded-xl text-sm font-semibold ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white'}`}
                  >
                    {daftarKelasAsal.map(k => <option key={k} value={k}>Kelas: {k}</option>)}
                  </select>
                </div>
              </div>

              <div className="p-6 overflow-y-auto flex-1 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-sm">Daftar Penyesuaian Siswa ({siswaFilteredWizard.length} Siswa)</h4>
                  <div className="flex gap-2">
                    <button 
                      type="button"
                      onClick={() => {
                        setSiswaKenaikanList(siswaKenaikanList.map(s => ({ ...s, statusBaru: 'Aktif' })));
                      }}
                      className="px-3 py-1 bg-green-500/10 text-green-500 border border-green-500/30 rounded-lg text-xs font-bold hover:bg-green-500/20 cursor-pointer"
                    >
                      Set Semua Naik Kelas
                    </button>
                  </div>
                </div>

                <div className={`border rounded-2xl overflow-hidden ${isDarkMode ? 'border-slate-800' : 'border-gray-200'}`}>
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className={`${isDarkMode ? 'bg-slate-800 text-slate-400 border-slate-700' : 'bg-gray-50 text-gray-500 border-b'} text-xs uppercase`}>
                        <th className="px-4 py-3">Nama Siswa</th>
                        <th className="px-4 py-3">Kelas Asal</th>
                        <th className="px-4 py-3">Prediksi Kelas Tujuan</th>
                        <th className="px-4 py-3 text-center">Status Kelulusan / Kenaikan</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${isDarkMode ? 'divide-slate-800' : 'divide-gray-100'} text-sm`}>
                      {siswaFilteredWizard.length > 0 ? (
                        siswaFilteredWizard.map(item => (
                          <tr key={item.id} className={`${isDarkMode ? 'hover:bg-slate-800/50' : 'hover:bg-gray-50'}`}>
                            <td className="px-4 py-3 font-bold">{item.nama}</td>
                            <td className="px-4 py-3 font-mono text-xs">{item.kelasLama}</td>
                            <td className="px-4 py-3 font-mono text-xs text-blue-500 font-bold">
                              <input 
                                type="text"
                                value={item.kelasBaru}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setSiswaKenaikanList(siswaKenaikanList.map(s => s.id === item.id ? { ...s, kelasBaru: val } : s));
                                }}
                                className={`border px-2 py-1 rounded text-xs w-36 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white'}`}
                              />
                            </td>
                            <td className="px-4 py-3 text-center">
                              <select 
                                value={item.statusBaru}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setSiswaKenaikanList(siswaKenaikanList.map(s => s.id === item.id ? { ...s, statusBaru: val } : s));
                                }}
                                className={`text-xs font-bold px-3 py-1.5 rounded-lg border ${
                                  item.statusBaru === 'Aktif' ? 'bg-green-500/10 text-green-400 border-green-500/30' :
                                  item.statusBaru === 'Tidak Naik' ? 'bg-red-500/10 text-red-400 border-red-500/30' :
                                  'bg-blue-500/10 text-blue-400 border-blue-500/30'
                                }`}
                              >
                                <option value="Aktif" className="bg-slate-900 text-white">Naik Tingkat (Aktif)</option>
                                <option value="Tidak Naik" className="bg-slate-900 text-white">Tidak Naik Kelas</option>
                                <option value="Lulus" className="bg-slate-900 text-white">Lulus / Alumni</option>
                              </select>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center py-8 text-gray-400 text-xs italic">Tidak ada siswa ditemukan pada filter kelas ini.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className={`p-4 border-t ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-gray-50'} flex justify-end gap-3`}>
                <button type="button" onClick={() => setIsKenaikanModalOpen(false)} className="px-5 py-2.5 rounded-xl text-sm font-medium cursor-pointer">Batal</button>
                <button type="submit" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium flex items-center gap-2 shadow cursor-pointer">
                  <CheckCircle size={18} /> Simpan & Generate TP {targetTpTujuan}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};


/* ==============================================================
   6. KOMPONEN JADWAL PIKET GURU HARIAN
============================================================== */
const KontenJadwalPiket = ({ jadwalPiket, setJadwalPiket, daftarGuru, isDarkMode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [hari, setHari] = useState('Senin');
  const [petugas1, setPetugas1] = useState('');
  const [petugas2, setPetugas2] = useState('');

  const handleOpenEdit = (item) => {
    setEditingId(item.id);
    setHari(item.hari);
    setPetugas1(item.petugas1 || '');
    setPetugas2(item.petugas2 || '');
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    
    // 1. Update ke Supabase Cloud berdasarkan id baris hari tersebut
    const { error } = await supabase
      .from('jadwal_piket')
      .update({ 
        petugas1: petugas1, 
        petugas2: petugas2 
      })
      .eq('id', editingId);

    if (error) {
      console.error('Gagal memperbarui jadwal piket di cloud:', error.message);
      alert('Gagal menyimpan perubahan ke database cloud!');
      return;
    }

    // 2. Update state lokal jika sukses
    const updated = jadwalPiket.map(item => item.id === editingId ? { ...item, petugas1, petugas2 } : item);
    setJadwalPiket(updated);
    setIsModalOpen(false);
    alert('Jadwal piket guru berhasil diperbarui dan tersimpan di cloud!');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className={`${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-gray-100 text-gray-800'} p-6 rounded-xl shadow-sm border flex flex-col md:flex-row justify-between items-center gap-4`}>
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Calendar className="text-blue-600" /> Modul Jadwal Piket Guru Harian
          </h3>
          <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Atur penugasan Petugas 1 dan Petugas 2 untuk gerbang sekolah dari Senin hingga Sabtu secara real-time cloud.</p>
        </div>
      </div>

      <div className={`${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-gray-100'} rounded-xl shadow-sm border overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[550px]">
            <thead>
              <tr className={`${isDarkMode ? 'bg-slate-800/60 text-slate-400 border-slate-800' : 'bg-gray-50 text-gray-500'} text-xs uppercase border-b`}>
                <th className="px-4 py-3">Hari</th>
                <th className="px-4 py-3">Petugas Piket 1</th>
                <th className="px-4 py-3">Petugas Piket 2</th>
                <th className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDarkMode ? 'divide-slate-800' : 'divide-gray-100'} text-xs md:text-sm`}>
              {jadwalPiket && jadwalPiket.length > 0 ? (
                jadwalPiket.map((item) => (
                  <tr key={item.id} className={`${isDarkMode ? 'hover:bg-slate-800/50' : 'hover:bg-gray-50'}`}>
                    <td className="px-4 py-3 font-bold text-blue-500 w-28">{item.hari}</td>
                    <td className="px-4 py-3 font-medium">{item.petugas1 || '-'}</td>
                    <td className="px-4 py-3 font-medium">{item.petugas2 || '-'}</td>
                    <td className="px-4 py-3 text-right">
                      <button 
                        onClick={() => handleOpenEdit(item)} 
                        className={`px-3 py-1.5 ${isDarkMode ? 'bg-blue-950 text-blue-300 hover:bg-blue-900' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'} rounded-lg font-medium text-xs flex items-center gap-1.5 ml-auto transition cursor-pointer flex-shrink-0`}
                      >
                        <Pencil size={14} /> Edit Petugas
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-12 text-gray-400 text-xs italic">Belum ada data jadwal piket di database.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL EDIT JADWAL PIKET */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className={`${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white text-gray-800'} w-full max-w-md rounded-2xl shadow-xl border p-6 space-y-4`}>
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-lg font-bold">Edit Petugas Piket - {hari}</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="cursor-pointer text-gray-400 hover:text-red-500 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Petugas Piket 1</label>
                <select 
                  value={petugas1} 
                  onChange={(e) => setPetugas1(e.target.value)}
                  className={`w-full p-2.5 rounded-lg border text-sm ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-gray-50 border-gray-300'}`}
                >
                  <option value="">-- Pilih Guru Petugas 1 --</option>
                  {daftarGuru && daftarGuru.map((guru, index) => (
                    <option key={index} value={guru.nama}>
                      {guru.nama} {guru.jabatan_kelas ? `(${guru.jabatan_kelas})` : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Petugas Piket 2</label>
                <select 
                  value={petugas2} 
                  onChange={(e) => setPetugas2(e.target.value)}
                  className={`w-full p-2.5 rounded-lg border text-sm ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-gray-50 border-gray-300'}`}
                >
                  <option value="">-- Pilih Guru Petugas 2 --</option>
                  {daftarGuru && daftarGuru.map((guru, index) => (
                    <option key={index} value={guru.nama}>
                      {guru.nama} {guru.jabatan_kelas ? `(${guru.jabatan_kelas})` : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border cursor-pointer ${isDarkMode ? 'border-slate-700 hover:bg-slate-800' : 'border-gray-300 hover:bg-gray-100'}`}
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition cursor-pointer"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

/* ==============================================================
   7. KOMPONEN POIN DISIPLIN & PELANGGARAN
============================================================== */
const KontenPoinDisiplin = ({ dataSiswa, dataPelanggaran, setDataPelanggaran, isDarkMode, tahunPelajaranAktif }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const siswaAktifTP = dataSiswa.filter(s => (s.statusTP?.[tahunPelajaranAktif] || 'Aktif') === 'Aktif' && s.kelasPerTP?.[tahunPelajaranAktif]);
  const daftarKelas = ['Semua', ...new Set(siswaAktifTP.map(s => s.kelasPerTP[tahunPelajaranAktif]))];

  const [selectedKelasFilter, setSelectedKelasFilter] = useState('Semua');
  const [selectedSiswaId, setSelectedSiswaId] = useState(siswaAktifTP[0]?.id || '');
  const [jenisPelanggaran, setJenisPelanggaran] = useState('');
  const [poin, setPoin] = useState(5);

  const siswaForModal = selectedKelasFilter === 'Semua' 
    ? siswaAktifTP 
    : siswaAktifTP.filter(s => s.kelasPerTP[tahunPelajaranAktif] === selectedKelasFilter);

  const handleAddPelanggaran = async (e) => {
    e.preventDefault();
    const targetSiswa = dataSiswa.find(s => s.id.toString() === selectedSiswaId.toString());
    if (!targetSiswa) return;

    const parsedPoin = parseInt(poin);
    if (isNaN(parsedPoin) || parsedPoin <= 0) {
      alert('Masukkan jumlah poin yang valid (angka lebih dari 0).');
      return;
    }

    const newRecord = {
      tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      nama_siswa: targetSiswa.nama,
      kelas: targetSiswa.kelasPerTP[tahunPelajaranAktif] || '-',
      jenis_pelanggaran: jenisPelanggaran,
      poin: parsedPoin,
      tahun_pelajaran: tahunPelajaranAktif
    };

    // 1. Simpan ke Supabase Cloud
    const { data, error } = await supabase
      .from('data_pelanggaran')
      .insert([newRecord])
      .select();

    if (error) {
      console.error('Gagal menyimpan pelanggaran:', error.message);
      alert('Gagal menyimpan ke database cloud!');
      return;
    }

    // 2. Jika sukses, masukkan ke state lokal dengan format yang sesuai
    if (data && data.length > 0) {
      const formattedRecord = {
        id: data[0].id,
        tanggal: data[0].tanggal,
        namaSiswa: data[0].nama_siswa,
        kelas: data[0].kelas,
        jenisPelanggaran: data[0].jenis_pelanggaran,
        poin: data[0].poin,
        tahunPelajaran: data[0].tahun_pelajaran
      };
      setDataPelanggaran([formattedRecord, ...dataPelanggaran]);
    }

    setJenisPelanggaran('');
    setPoin(5);
    setIsModalOpen(false);
  };

  const handleDeletePelanggaran = async (id) => {
    if (window.confirm('Hapus catatan pelanggaran ini?')) {
      // 1. Hapus dari Supabase Cloud
      const { error } = await supabase
        .from('data_pelanggaran')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Gagal menghapus pelanggaran:', error.message);
        alert('Gagal menghapus data dari cloud!');
        return;
      }

      // 2. Hapus dari state lokal
      setDataPelanggaran(dataPelanggaran.filter(p => p.id !== id));
    }
  };

  const currentPelanggaran = dataPelanggaran.filter(p => p.tahunPelajaran === tahunPelajaranAktif);

  const rekapPoinSiswa = siswaAktifTP
    .filter(siswa => selectedKelasFilter === 'Semua' || siswa.kelasPerTP[tahunPelajaranAktif] === selectedKelasFilter)
    .map(siswa => {
      const pelanggaranSiswa = currentPelanggaran.filter(p => p.namaSiswa.toLowerCase() === siswa.nama.toLowerCase());
      const totalPoin = pelanggaranSiswa.reduce((acc, curr) => acc + curr.poin, 0);
      return {
        ...siswa,
        kelas: siswa.kelasPerTP[tahunPelajaranAktif],
        totalPoin,
        statusDisiplin: totalPoin >= 50 ? 'Bahaya (SP)' : totalPoin >= 25 ? 'Peringatan' : 'Aman'
      };
    });

  const filteredPelanggaran = selectedKelasFilter === 'Semua'
    ? currentPelanggaran
    : currentPelanggaran.filter(p => p.kelas.toLowerCase() === selectedKelasFilter.toLowerCase());

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className={`${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-gray-100 text-gray-800'} p-6 rounded-xl shadow-sm border flex flex-col md:flex-row justify-between items-center gap-4`}>
        <div>
          <h3 className="text-xl font-bold">Modul Poin Disiplin & Pelanggaran ({tahunPelajaranAktif})</h3>
          <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Pantau catatan kedisiplinan dan akumulasi poin pelanggaran siswa per kelas secara real-time cloud.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-gray-500'} uppercase tracking-wider`}>Filter Kelas:</span>
            <select 
              value={selectedKelasFilter} 
              onChange={(e) => setSelectedKelasFilter(e.target.value)} 
              className={`border px-3 py-2 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-blue-400' : 'bg-blue-50 border-gray-200 text-blue-700'}`}
            >
              {daftarKelas.map(k => <option key={k} value={k} className="bg-slate-900 text-white">{k}</option>)}
            </select>
          </div>
          <button 
            onClick={() => {
              setSelectedSiswaId(siswaForModal[0]?.id || '');
              setIsModalOpen(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 shadow transition cursor-pointer text-sm whitespace-nowrap"
          >
            <Plus size={18} /> Catat Pelanggaran
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-gray-100 text-gray-800'} lg:col-span-1 p-6 rounded-xl shadow-sm border flex flex-col`}>
          <h4 className="font-bold mb-4">Akumulasi Poin Siswa ({selectedKelasFilter})</h4>
          <div className="space-y-3 overflow-y-auto max-h-[400px]">
            {rekapPoinSiswa.length > 0 ? (
              rekapPoinSiswa.map(siswa => (
                <div key={siswa.id} className={`p-3 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-gray-50 border text-gray-800'} rounded-xl flex justify-between items-center`}>
                  <div>
                    <p className="font-bold text-sm">{siswa.nama}</p>
                    <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>{siswa.kelas}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      siswa.statusDisiplin.includes('Bahaya') ? 'bg-red-500/10 text-red-400' :
                      siswa.statusDisiplin === 'Peringatan' ? 'bg-yellow-500/10 text-yellow-400' :
                      'bg-green-500/10 text-green-400'
                    }`}>
                      {siswa.totalPoin} Poin ({siswa.statusDisiplin})
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-8 text-gray-400 text-xs italic">Tidak ada data siswa aktif untuk tahun pelajaran {tahunPelajaranAktif}.</p>
            )}
          </div>
        </div>

        <div className={`${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-gray-100 text-gray-800'} lg:col-span-2 rounded-xl shadow-sm border flex flex-col`}>
          <div className={`p-6 border-b ${isDarkMode ? 'border-slate-800' : 'border-gray-100'} flex justify-between items-center`}>
            <h4 className="font-bold">Riwayat Catatan Pelanggaran ({selectedKelasFilter})</h4>
          </div>
          <div className="p-2 overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className={`${isDarkMode ? 'bg-slate-800/60 text-slate-400 border-slate-800' : 'bg-gray-50 text-gray-500'} text-xs uppercase border-b`}>
                  <th className="px-6 py-4">Tanggal</th>
                  <th className="px-6 py-4">Nama Siswa</th>
                  <th className="px-6 py-4">Kelas</th>
                  <th className="px-6 py-4">Jenis Pelanggaran</th>
                  <th className="px-6 py-4">Poin</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDarkMode ? 'divide-slate-800' : 'divide-gray-100'} text-sm`}>
                {filteredPelanggaran.length > 0 ? (
                  filteredPelanggaran.map(item => (
                    <tr key={item.id} className={`${isDarkMode ? 'hover:bg-slate-800/50' : 'hover:bg-gray-50'}`}>
                      <td className="px-6 py-4 font-medium">{item.tanggal}</td>
                      <td className="px-6 py-4 font-bold">{item.namaSiswa}</td>
                      <td className="px-6 py-4">{item.kelas}</td>
                      <td className="px-6 py-4">{item.jenisPelanggaran}</td>
                      <td className="px-6 py-4 font-bold text-red-500">+{item.poin}</td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => handleDeletePelanggaran(item.id)} className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg transition cursor-pointer">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-12 text-gray-400 text-xs italic">Belum ada catatan pelanggaran untuk tahun pelajaran {tahunPelajaranAktif}.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className={`${isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white text-gray-800'} w-full max-w-md rounded-2xl shadow-xl overflow-hidden`}>
            <div className={`flex justify-between p-6 border-b ${isDarkMode ? 'border-slate-800' : 'border-gray-100'}`}>
              <h3 className="font-bold">Form Catat Pelanggaran Siswa</h3>
              <button onClick={() => setIsModalOpen(false)} className="cursor-pointer"><X size={20}/></button>
            </div>
            <form onSubmit={handleAddPelanggaran}>
              <div className="p-6 space-y-4">
                <div>
                  <label className={`block text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-gray-500'} uppercase tracking-wider mb-1`}>Pilih Kelas</label>
                  <select 
                    value={selectedKelasFilter} 
                    onChange={(e) => {
                      setSelectedKelasFilter(e.target.value);
                      const filtered = e.target.value === 'Semua' ? siswaAktifTP : siswaAktifTP.filter(s => s.kelasPerTP[tahunPelajaranAktif] === e.target.value);
                      setSelectedSiswaId(filtered[0]?.id || '');
                    }}
                    className={`w-full border rounded-lg p-2.5 text-sm ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white'}`}
                  >
                    {daftarKelas.map(k => (
                      <option key={k} value={k} className="bg-slate-900 text-white">Kelas: {k}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={`block text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-gray-500'} uppercase tracking-wider mb-1`}>Pilih Siswa</label>
                  <select 
                    value={selectedSiswaId} 
                    onChange={(e) => setSelectedSiswaId(e.target.value)}
                    className={`w-full border rounded-lg p-2.5 text-sm ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white'}`}
                  >
                    {siswaForModal.length > 0 ? (
                      siswaForModal.map(s => (
                        <option key={s.id} value={s.id} className="bg-slate-900 text-white">{s.nama} ({s.kelasPerTP[tahunPelajaranAktif]})</option>
                      ))
                    ) : (
                      <option value="">Tidak ada siswa di kelas ini</option>
                    )}
                  </select>
                </div>
                <div>
                  <label className={`block text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-gray-500'} uppercase tracking-wider mb-1`}>Jenis Pelanggaran</label>
                  <input 
                    type="text" 
                    required 
                    value={jenisPelanggaran} 
                    onChange={(e) => setJenisPelanggaran(e.target.value)} 
                    className={`w-full border rounded-lg p-2.5 text-sm ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : ''}`} 
                    placeholder="Contoh: Tidak memakai atribut lengkap / Terlambat" 
                  />
                </div>
                <div>
                  <label className={`block text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-gray-500'} uppercase tracking-wider mb-1`}>Jumlah Poin Pelanggaran</label>
                  <input 
                    type="number" 
                    min="1"
                    required 
                    value={poin} 
                    onChange={(e) => setPoin(e.target.value)} 
                    className={`w-full border rounded-lg p-2.5 text-sm font-bold text-red-500 ${isDarkMode ? 'bg-slate-800 border-slate-700' : ''}`} 
                    placeholder="Masukkan angka poin..." 
                  />
                </div>
              </div>
              <div className={`p-6 border-t ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-gray-50'} flex justify-end gap-3 rounded-b-2xl`}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg text-sm cursor-pointer">Batal</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg flex gap-2 text-sm font-medium cursor-pointer"><CheckCircle size={18}/> Simpan Catatan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

/* ==============================================================
   8. KOMPONEN TREN & STATISTIK DISIPLIN
============================================================== */
const KontenTrenDisiplin = ({ dataPelanggaran, dataSiswa, isDarkMode, tahunPelajaranAktif }) => {
  const siswaAktifTP = dataSiswa.filter(s => (s.statusTP?.[tahunPelajaranAktif] || 'Aktif') === 'Aktif' && s.kelasPerTP?.[tahunPelajaranAktif]);
  const daftarKelas = ['Semua', ...new Set(siswaAktifTP.map(s => s.kelasPerTP[tahunPelajaranAktif]))];
  const [selectedKelasFilter, setSelectedKelasFilter] = useState('Semua');

  const currentPelanggaran = dataPelanggaran.filter(p => p.tahunPelajaran === tahunPelajaranAktif);

  const filteredPelanggaran = selectedKelasFilter === 'Semua' 
    ? currentPelanggaran 
    : currentPelanggaran.filter(p => p.kelas.toLowerCase() === selectedKelasFilter.toLowerCase());

  const totalKasus = filteredPelanggaran.length;
  const totalPoinAkumulasi = filteredPelanggaran.reduce((acc, curr) => acc + curr.poin, 0);

  const jenisCount = {};
  filteredPelanggaran.forEach(p => {
    jenisCount[p.jenisPelanggaran] = (jenisCount[p.jenisPelanggaran] || 0) + 1;
  });
  const sortedJenis = Object.entries(jenisCount).sort((a, b) => b[1] - a[1]);

  const kelasCount = {};
  currentPelanggaran.forEach(p => {
    kelasCount[p.kelas] = (kelasCount[p.kelas] || 0) + p.poin;
  });
  const sortedKelas = Object.entries(kelasCount).sort((a, b) => b[1] - a[1]);

  const exportStatistikCSV = () => {
    if (filteredPelanggaran.length === 0) {
      alert('Tidak ada data statistik untuk diexport pada filter kelas ini!');
      return;
    }
    let csvContent = "data:text/csv;charset=utf-8,No,Tanggal,Nama Siswa,Kelas,Jenis Pelanggaran,Poin\n";
    filteredPelanggaran.forEach((item, index) => {
      csvContent += `${index + 1},${item.tanggal},"${item.namaSiswa}","${item.kelas}","${item.jenisPelanggaran}",${item.poin}\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Statistik_Disiplin_TP_${tahunPelajaranAktif.replace('/', '-')}_${selectedKelasFilter.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className={`${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-gray-100 text-gray-800'} p-6 rounded-xl shadow-sm border flex flex-col md:flex-row justify-between items-center gap-4`}>
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2">
            <TrendingUp className="text-blue-600" /> Analisis Tren & Statistik Disiplin ({tahunPelajaranAktif})
          </h3>
          <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Pemetaan visual bentuk pelanggaran dan tingkat kedisiplinan per kelas secara real-time.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-gray-500'} uppercase tracking-wider`}>Filter Kelas:</span>
            <select 
              value={selectedKelasFilter} 
              onChange={(e) => setSelectedKelasFilter(e.target.value)} 
              className={`border px-3 py-2 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-blue-400' : 'bg-blue-50 border-gray-200 text-blue-700'}`}
            >
              {daftarKelas.map(k => <option key={k} value={k} className="bg-slate-900 text-white">{k}</option>)}
            </select>
          </div>
          <button 
            onClick={exportStatistikCSV}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-medium flex items-center gap-2 shadow transition cursor-pointer text-sm whitespace-nowrap"
          >
            <Download size={16} /> Unduh Statistik ({selectedKelasFilter})
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-gray-100 text-gray-800'} p-6 rounded-xl shadow-sm border flex items-center gap-4`}>
          <div className="w-14 h-14 bg-rose-500/10 text-rose-500 rounded-2xl flex items-center justify-center font-bold text-2xl">
            <AlertTriangle size={28} />
          </div>
          <div>
            <p className={`text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-gray-400'} uppercase tracking-wider`}>Total Kasus ({selectedKelasFilter})</p>
            <h4 className="text-3xl font-black mt-1">{totalKasus} <span className={`text-sm font-normal ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Kasus</span></h4>
          </div>
        </div>

        <div className={`${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-gray-100 text-gray-800'} p-6 rounded-xl shadow-sm border flex items-center gap-4`}>
          <div className="w-14 h-14 bg-orange-500/10 text-orange-500 rounded-2xl flex items-center justify-center font-bold text-2xl">
            <BarChart2 size={28} />
          </div>
          <div>
            <p className={`text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-gray-400'} uppercase tracking-wider`}>Akumulasi Poin Sanksi</p>
            <h4 className="text-3xl font-black text-orange-500 mt-1">{totalPoinAkumulasi} <span className={`text-sm font-normal ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Poin</span></h4>
          </div>
        </div>

        <div className={`${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-gray-100 text-gray-800'} p-6 rounded-xl shadow-sm border flex items-center gap-4`}>
          <div className="w-14 h-14 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center font-bold text-2xl">
            <Users size={28} />
          </div>
          <div>
            <p className={`text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-gray-400'} uppercase tracking-wider`}>Target Filter</p>
            <h4 className="text-lg font-bold text-blue-500 mt-1 truncate max-w-[180px]">{selectedKelasFilter}</h4>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-gray-100 text-gray-800'} p-6 rounded-xl shadow-sm border space-y-4`}>
          <h4 className={`font-bold flex items-center gap-2 border-b pb-3 ${isDarkMode ? 'border-slate-800' : 'border-gray-100'}`}>
            <PieChart className="text-blue-500" /> Jenis Pelanggaran Teratas ({selectedKelasFilter})
          </h4>
          <div className="space-y-4">
            {sortedJenis.length > 0 ? (
              sortedJenis.map(([jenis, count], idx) => {
                const percentage = totalKasus > 0 ? Math.round((count / totalKasus) * 100) : 0;
                return (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span>{idx + 1}. {jenis}</span>
                      <span className="text-blue-500">{count} Kasus ({percentage}%)</span>
                    </div>
                    <div className={`w-full ${isDarkMode ? 'bg-slate-800' : 'bg-gray-100'} h-2.5 rounded-full overflow-hidden`}>
                      <div className="bg-blue-600 h-full rounded-full transition-all duration-500" style={{ width: `${percentage}%` }}></div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center py-8 text-gray-400 text-xs italic">Tidak ada data pelanggaran untuk tahun pelajaran {tahunPelajaranAktif}.</p>
            )}
          </div>
        </div>

        <div className={`${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-gray-100 text-gray-800'} p-6 rounded-xl shadow-sm border space-y-4`}>
          <h4 className={`font-bold flex items-center gap-2 border-b pb-3 ${isDarkMode ? 'border-slate-800' : 'border-gray-100'}`}>
            <BarChart2 className="text-orange-500" /> Poin Pelanggaran Tertinggi Berdasarkan Kelas
          </h4>
          <div className="space-y-4">
            {sortedKelas.length > 0 ? (
              sortedKelas.map(([kelas, poin], idx) => {
                const maxPoin = Math.max(...Object.values(kelasCount), 1);
                const percentage = Math.round((poin / maxPoin) * 100);
                return (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span>Kelas: {kelas}</span>
                      <span className="text-orange-500">{poin} Akumulasi Poin</span>
                    </div>
                    <div className={`w-full ${isDarkMode ? 'bg-slate-800' : 'bg-gray-100'} h-2.5 rounded-full overflow-hidden`}>
                      <div className="bg-orange-500 h-full rounded-full transition-all duration-500" style={{ width: `${percentage}%` }}></div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center py-8 text-gray-400 text-xs italic">Belum ada akumulasi poin kelas.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


/* ==============================================================
   9. KOMPONEN PERIZINAN & SURAT SAKIT ONLINE
============================================================== */
const KontenPerizinanSiswa = ({ dataSiswa, dataGuru, dataPerizinan, setDataPerizinan, infoSekolah, isDarkMode, tahunPelajaranAktif }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const siswaAktifTP = dataSiswa.filter(s => (s.statusTP?.[tahunPelajaranAktif] || 'Aktif') === 'Aktif' && s.kelasPerTP?.[tahunPelajaranAktif]);
  const daftarKelas = ['Semua', ...new Set(siswaAktifTP.map(s => s.kelasPerTP[tahunPelajaranAktif]))];
  const [selectedKelasFilter, setSelectedKelasFilter] = useState('Semua');
  
  const [selectedSiswaId, setSelectedSiswaId] = useState(siswaAktifTP[0]?.id || '');
  const [jenisIzin, setJenisIzin] = useState('');
  const [jamKeluar, setJamKeluar] = useState(new Date().toTimeString().substring(0, 5));
  const [jamKembali, setJamKembali] = useState('');
  const [pemberiIzin, setPemberiIzin] = useState(dataGuru[0]?.nama || 'Guru Piket');

  const [activeSuratIzin, setActiveSuratIzin] = useState(null);

  const siswaForModal = selectedKelasFilter === 'Semua' 
    ? siswaAktifTP 
    : siswaAktifTP.filter(s => s.kelasPerTP[tahunPelajaranAktif] === selectedKelasFilter);

  const handleAddPerizinan = async (e) => {
    e.preventDefault();
    const targetSiswa = dataSiswa.find(s => s.id.toString() === selectedSiswaId.toString());
    if (!targetSiswa) return;

    if (!jenisIzin.trim()) {
      alert('Mohon masukkan keterangan keperluan / jenis izin.');
      return;
    }

    const newRecord = {
      tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      nama: targetSiswa.nama,
      kelas: targetSiswa.kelasPerTP[tahunPelajaranAktif] || '-',
      jenis_izin: jenisIzin,
      jam_keluar: jamKeluar,
      jam_kembali: jamKembali || '-',
      status: 'Sedang di Luar',
      pemberi_izin: pemberiIzin,
      tahun_pelajaran: tahunPelajaranAktif
    };

    // 1. Simpan ke Supabase Cloud
    const { data, error } = await supabase
      .from('data_perizinan')
      .insert([newRecord])
      .select();

    if (error) {
      console.error('Gagal menyimpan perizinan:', error.message);
      alert('Gagal menyimpan perizinan ke database cloud!');
      return;
    }

    // 2. Update state lokal jika sukses
    if (data && data.length > 0) {
      const formattedRecord = {
        id: data[0].id,
        tanggal: data[0].tanggal,
        nama: data[0].nama,
        kelas: data[0].kelas,
        jenisIzin: data[0].jenis_izin,
        jamKeluar: data[0].jam_keluar,
        jamKembali: data[0].jam_kembali,
        status: data[0].status,
        pemberiIzin: data[0].pemberi_izin,
        tahunPelajaran: data[0].tahun_pelajaran
      };
      setDataPerizinan([formattedRecord, ...dataPerizinan]);
    }

    setJenisIzin('');
    setJamKembali('');
    setIsModalOpen(false);
  };

  const handleTandaiKembali = async (id) => {
    const nowStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    
    // 1. Update ke Supabase Cloud
    const { error } = await supabase
      .from('data_perizinan')
      .update({ status: 'Sudah Kembali', jam_kembali: nowStr })
      .eq('id', id);

    if (error) {
      console.error('Gagal memperbarui status kembali:', error.message);
      alert('Gagal memperbarui status di cloud!');
      return;
    }

    // 2. Update state lokal
    const updated = dataPerizinan.map(item => item.id === id ? { ...item, status: 'Sudah Kembali', jamKembali: nowStr } : item);
    setDataPerizinan(updated);
  };

  const handleDeletePerizinan = async (id) => {
    if (window.confirm('Hapus catatan perizinan ini?')) {
      // 1. Hapus dari Supabase Cloud
      const { error } = await supabase
        .from('data_perizinan')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Gagal menghapus perizinan:', error.message);
        alert('Gagal menghapus data dari cloud!');
        return;
      }

      // 2. Update state lokal
      setDataPerizinan(dataPerizinan.filter(p => p.id !== id));
    }
  };

  const handlePrintSurat = () => {
    window.print();
  };

  const currentPerizinan = dataPerizinan.filter(p => p.tahunPelajaran === tahunPelajaranAktif);

  const filteredPerizinan = selectedKelasFilter === 'Semua'
    ? currentPerizinan
    : currentPerizinan.filter(p => p.kelas.toLowerCase() === selectedKelasFilter.toLowerCase());

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body * { visibility: hidden; }
          #printable-surat-izin, #printable-surat-izin * { visibility: visible; }
          #printable-surat-izin {
            position: absolute; left: 0; top: 0; width: 100%;
            background: white !important; box-shadow: none !important;
            padding: 30px; margin: 0; color: black !important;
          }
          .no-print { display: none !important; }
        }
      `}} />

      <div className={`${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-gray-100 text-gray-800'} p-6 rounded-xl shadow-sm border flex flex-col md:flex-row justify-between items-center gap-4 no-print`}>
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2">
            <FileCheck className="text-blue-600" /> Modul Perizinan & Surat Sakit Online ({tahunPelajaranAktif})
          </h3>
          <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Kelola dan pantau siswa yang izin keluar gerbang di tengah jam pelajaran secara real-time cloud.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-gray-500'} uppercase tracking-wider`}>Filter Kelas:</span>
            <select 
              value={selectedKelasFilter} 
              onChange={(e) => setSelectedKelasFilter(e.target.value)} 
              className={`border px-3 py-2 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-blue-400' : 'bg-blue-50 border-gray-200 text-blue-700'}`}
            >
              {daftarKelas.map(k => <option key={k} value={k} className="bg-slate-900 text-white">{k}</option>)}
            </select>
          </div>
          <button 
            onClick={() => {
              setSelectedSiswaId(siswaForModal[0]?.id || '');
              setJenisIzin('');
              setIsModalOpen(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 shadow transition cursor-pointer text-sm whitespace-nowrap"
          >
            <Plus size={18} /> Catat Izin Baru
          </button>
        </div>
      </div>

      <div className={`${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-gray-100'} rounded-xl shadow-sm border overflow-hidden p-2 no-print`}>
        <div className={`p-4 border-b ${isDarkMode ? 'border-slate-800' : 'border-gray-100'}`}>
          <h4 className="font-bold">Daftar Perizinan & Surat Sakit Aktif ({selectedKelasFilter})</h4>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className={`${isDarkMode ? 'bg-slate-800/60 text-slate-400 border-slate-800' : 'bg-gray-50 text-gray-500'} text-xs uppercase border-b`}>
              <th className="px-6 py-4">Tanggal</th>
              <th className="px-6 py-4">Nama Siswa</th>
              <th className="px-6 py-4">Kelas</th>
              <th className="px-6 py-4">Keperluan / Alasan Izin</th>
              <th className="px-6 py-4">Jam Keluar - Kembali</th>
              <th className="px-6 py-4">Guru Pemberi Izin</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${isDarkMode ? 'divide-slate-800' : 'divide-gray-100'} text-sm`}>
            {filteredPerizinan.length > 0 ? (
              filteredPerizinan.map(item => (
                <tr key={item.id} className={`${isDarkMode ? 'hover:bg-slate-800/50' : 'hover:bg-gray-50'}`}>
                  <td className="px-6 py-4 font-medium">{item.tanggal}</td>
                  <td className="px-6 py-4 font-bold">{item.nama}</td>
                  <td className="px-6 py-4">{item.kelas}</td>
                  <td className="px-6 py-4 font-semibold text-blue-500">{item.jenisIzin}</td>
                  <td className="px-6 py-4 font-mono text-xs">{item.jamKeluar} &bull; {item.jamKembali}</td>
                  <td className="px-6 py-4 opacity-80">{item.pemberiIzin}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      item.status === 'Sedang di Luar' ? 'bg-orange-500/20 text-orange-400 animate-pulse border border-orange-500/30' : 'bg-green-500/20 text-green-400 border border-green-500/30'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                    <button onClick={() => setActiveSuratIzin(item)} title="Download / Cetak Surat Izin" className={`p-1.5 ${isDarkMode ? 'bg-blue-950 text-blue-300 hover:bg-blue-900' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'} rounded-lg transition cursor-pointer`}>
                      <Printer size={16} />
                    </button>
                    {item.status === 'Sedang di Luar' && (
                      <button onClick={() => handleTandaiKembali(item.id)} className={`px-3 py-1.5 ${isDarkMode ? 'bg-green-950 text-green-300 hover:bg-green-900' : 'bg-green-50 text-green-600 hover:bg-green-100'} rounded-lg text-xs font-semibold transition cursor-pointer`}>
                        Tandai Kembali
                      </button>
                    )}
                    <button onClick={() => handleDeletePerizinan(item.id)} className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg transition cursor-pointer">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-12 text-gray-400 text-xs italic">Tidak ada data perizinan siswa untuk tahun pelajaran {tahunPelajaranAktif}.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {activeSuratIzin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className={`${isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white text-gray-800'} w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]`}>
            <div className="bg-blue-600 p-4 text-white flex justify-between items-center no-print">
              <h3 className="font-bold text-base">Pratinjau Surat Izin Keluar Sekolah</h3>
              <div className="flex items-center gap-2">
                <button onClick={handlePrintSurat} className="bg-white text-blue-700 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 hover:bg-blue-50 transition cursor-pointer">
                  <Printer size={14} /> Cetak / Download PDF
                </button>
                <button onClick={() => setActiveSuratIzin(null)} className="text-white/80 hover:text-white p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition cursor-pointer"><X size={18}/></button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto flex-1 bg-gray-50 flex justify-center">
              <div id="printable-surat-izin" className="bg-white text-gray-800 w-[650px] p-8 shadow-sm rounded-xl space-y-6 border">
                <div className="flex items-center justify-between border-b-2 border-gray-800 pb-4">
                  <div className="w-20 h-20 bg-blue-600 rounded-xl flex items-center justify-center text-white overflow-hidden flex-shrink-0 shadow-sm">
                    {infoSekolah.logo ? <img src={infoSekolah.logo} alt="Logo" className="w-full h-full object-cover" /> : <School size={40} />}
                  </div>
                  <div className="text-center flex-1 px-4">
                    <h3 className="font-black text-xl uppercase tracking-wider">{infoSekolah.nama}</h3>
                    <p className="text-[11px] text-gray-700 font-medium mt-0.5">{infoSekolah.alamat}</p>
                    <p className="text-[10px] text-gray-500 mt-1">Layanan Administrasi Digital &bull; TP {tahunPelajaranAktif}</p>
                  </div>
                  <div className="w-20 flex-shrink-0 invisible"></div>
                </div>

                <div className="text-center space-y-1">
                  <h4 className="font-bold text-sm underline uppercase">SURAT KETERANGAN IZIN KELUAR LINGKUNGAN SEKOLAH</h4>
                  <p className="text-xs text-gray-500 font-mono">Nomor: {activeSuratIzin.id}/IZIN-SKS/{new Date().getFullYear()}</p>
                </div>

                <div className="text-xs text-gray-700 space-y-3 leading-relaxed">
                  <p>Yang bertanda tangan di bawah ini, Guru Piket <strong>{infoSekolah.nama}</strong>, memberikan izin kepada siswa tersebut di bawah ini:</p>
                  
                  <div className="bg-gray-50 p-4 rounded-xl border space-y-2">
                    <div className="grid grid-cols-3"><span className="text-gray-500">Nama Siswa:</span><span className="font-bold col-span-2">{activeSuratIzin.nama}</span></div>
                    <div className="grid grid-cols-3"><span className="text-gray-500">Kelas / Jurusan:</span><span className="font-bold col-span-2">{activeSuratIzin.kelas}</span></div>
                    <div className="grid grid-cols-3"><span className="text-gray-500">Keperluan / Alasan:</span><span className="font-bold text-blue-600 col-span-2">{activeSuratIzin.jenisIzin}</span></div>
                    <div className="grid grid-cols-3"><span className="text-gray-500">Tanggal:</span><span className="font-bold col-span-2">{activeSuratIzin.tanggal}</span></div>
                    <div className="grid grid-cols-3"><span className="text-gray-500">Jam Keluar:</span><span className="font-mono font-bold text-orange-600 col-span-2">{activeSuratIzin.jamKeluar} WIB</span></div>
                    <div className="grid grid-cols-3"><span className="text-gray-500">Estimasi Kembali:</span><span className="font-mono font-bold text-green-600 col-span-2">{activeSuratIzin.jamKembali} WIB</span></div>
                  </div>

                  <p>Demikian surat izin ini dibuat dengan sebenarnya agar dapat dipergunakan sebagaimana mestinya, Terimakasih.</p>
                </div>

                <div className="pt-6 flex justify-between text-xs text-center">
                  <div>
                    <p>Mengetahui,</p>
                    <p className="font-bold">Orang Tua / Wali Murid</p>
                    <div className="h-16"></div>
                    <p className="border-t border-gray-400 inline-block px-6 pt-1">( . . . . . . . . . . . . . . . . . . )</p>
                  </div>
                  <div>
                    <p>Dikeluarkan di: {infoSekolah.nama}</p>
                    <p className="font-bold">Guru Piket Pemberi Izin</p>
                    <div className="h-16"></div>
                    <p className="border-t border-gray-400 inline-block px-6 pt-1 font-semibold">{activeSuratIzin.pemberiIzin}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`p-4 border-t ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-gray-50'} flex justify-end no-print`}>
              <button onClick={() => setActiveSuratIzin(null)} className="px-5 py-2 bg-gray-800 text-white rounded-xl text-sm font-medium cursor-pointer">Tutup</button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className={`${isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white text-gray-800'} w-full max-w-md rounded-2xl shadow-xl overflow-hidden`}>
            <div className={`flex justify-between p-6 border-b ${isDarkMode ? 'border-slate-800' : 'border-gray-100'}`}>
              <h3 className="font-bold">Form Catat Perizinan / Surat Sakit</h3>
              <button onClick={() => setIsModalOpen(false)} className="cursor-pointer"><X size={20}/></button>
            </div>
            <form onSubmit={handleAddPerizinan}>
              <div className="p-6 space-y-4">
                <div>
                  <label className={`block text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-gray-500'} uppercase tracking-wider mb-1`}>Pilih Kelas</label>
                  <select 
                    value={selectedKelasFilter} 
                    onChange={(e) => {
                      setSelectedKelasFilter(e.target.value);
                      const filtered = e.target.value === 'Semua' ? siswaAktifTP : siswaAktifTP.filter(s => s.kelasPerTP[tahunPelajaranAktif] === e.target.value);
                      setSelectedSiswaId(filtered[0]?.id || '');
                    }}
                    className={`w-full border rounded-lg p-2.5 text-sm ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white'}`}
                  >
                    {daftarKelas.map(k => (
                      <option key={k} value={k} className="bg-slate-900 text-white">Kelas: {k}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={`block text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-gray-500'} uppercase tracking-wider mb-1`}>Pilih Siswa</label>
                  <select 
                    value={selectedSiswaId} 
                    onChange={(e) => setSelectedSiswaId(e.target.value)}
                    className={`w-full border rounded-lg p-2.5 text-sm ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white'}`}
                  >
                    {siswaForModal.length > 0 ? (
                      siswaForModal.map(s => (
                        <option key={s.id} value={s.id} className="bg-slate-900 text-white">{s.nama} ({s.kelasPerTP[tahunPelajaranAktif]})</option>
                      ))
                    ) : (
                      <option value="">Tidak ada siswa di kelas ini</option>
                    )}
                  </select>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className={`block text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-gray-500'} uppercase tracking-wider`}>Keperluan / Alasan Izin</label>
                  </div>
                  <input 
                    type="text" 
                    required 
                    value={jenisIzin} 
                    onChange={(e) => setJenisIzin(e.target.value)} 
                    className={`w-full border rounded-lg p-2.5 text-sm ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : ''}`} 
                    placeholder="Contoh: Sakit / Dispensasi Lomba / Urusan Keluarga" 
                  />
                  <div className="flex flex-wrap gap-1 mt-2">
                    <span className="text-[10px] opacity-60 self-center mr-1">Saran Cepat:</span>
                    {['Sakit', 'Keperluan Keluarga', 'Dispensasi Lomba', 'Pulang Cepat', 'Izin Dokter'].map((saran, idx) => (
                      <button 
                        key={idx}
                        type="button"
                        onClick={() => setJenisIzin(saran)}
                        className={`px-2 py-0.5 rounded text-[10px] font-medium transition cursor-pointer border ${isDarkMode ? 'bg-slate-800 hover:bg-blue-950 text-slate-300 border-slate-700' : 'bg-gray-100 hover:bg-blue-50 hover:text-blue-600 text-gray-600'}`}
                      >
                        {saran}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-gray-500'} uppercase tracking-wider mb-1`}>Jam Keluar</label>
                    <input 
                      type="time" 
                      required 
                      value={jamKeluar} 
                      onChange={(e) => setJamKeluar(e.target.value)} 
                      className={`w-full border rounded-lg p-2.5 text-sm ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : ''}`} 
                    />
                  </div>
                  <div>
                    <label className={`block text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-gray-500'} uppercase tracking-wider mb-1`}>Estimasi Kembali</label>
                    <input 
                      type="time" 
                      value={jamKembali} 
                      onChange={(e) => setJamKembali(e.target.value)} 
                      className={`w-full border rounded-lg p-2.5 text-sm ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : ''}`} 
                      placeholder="Opsional" 
                    />
                  </div>
                </div>
                <div>
                  <label className={`block text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-gray-500'} uppercase tracking-wider mb-1`}>Guru Piket Pemberi Izin</label>
                  <select 
                    value={pemberiIzin} 
                    onChange={(e) => setPemberiIzin(e.target.value)} 
                    className={`w-full border rounded-lg p-2.5 text-sm ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white'}`}
                  >
                    {dataGuru.map(g => (
                      <option key={g.id} value={g.nama} className="bg-slate-900 text-white">{g.nama} ({g.jabatan_kelas})</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className={`p-6 border-t ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-gray-50'} flex justify-end gap-3 rounded-b-2xl`}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg text-sm cursor-pointer">Batal</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg flex gap-2 text-sm font-medium cursor-pointer"><CheckCircle size={18}/> Simpan Izin</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

/* ==============================================================
   10. KOMPONEN CETAK KARTU RFID & QR CODE DIGITAL
============================================================== */
const KontenCetakKartu = ({ dataGuru, dataSiswa, infoSekolah, isDarkMode, tahunPelajaranAktif }) => {
  const [selectedType, setSelectedType] = useState('siswa');
  const siswaAktifTP = dataSiswa.filter(s => (s.statusTP?.[tahunPelajaranAktif] || 'Aktif') === 'Aktif' && s.kelasPerTP?.[tahunPelajaranAktif]);
  
  const [modeCetak, setModeCetak] = useState('perorangan'); 
  const [selectedKelas, setSelectedKelas] = useState('');
  
  // State untuk filter kelas pada mode perorangan siswa
  const [selectedPeroranganKelas, setSelectedPeroranganKelas] = useState('');

  const daftarKelasUnik = [...new Set(siswaAktifTP.map(s => s.kelasPerTP?.[tahunPelajaranAktif]).filter(Boolean))].sort();

  // Daftar siswa terfilter berdasarkan kelas di mode perorangan
  const siswaPeroranganList = selectedPeroranganKelas 
    ? siswaAktifTP.filter(s => s.kelasPerTP?.[tahunPelajaranAktif] === selectedPeroranganKelas)
    : siswaAktifTP;

  const activeList = selectedType === 'siswa' ? siswaPeroranganList : dataGuru;

  const [selectedPerson, setSelectedPerson] = useState(activeList[0] || null);
  const [temaDesain, setTemaDesain] = useState('modern_blue'); 

  const [teksBelakang1, setTeksBelakang1] = useState('1. Wajib dibawa atau disimpan di smartphone (QR Code).');
  const [teksBelakang2, setTeksBelakang2] = useState('2. Digunakan untuk presensi otomatis dan perizinan digital.');
  const [teksBelakang3, setTeksBelakang3] = useState('3. Jika kartu hilang, segera laporkan ke bagian administrasi.');

  const siswaPerKelasList = selectedKelas 
    ? siswaAktifTP.filter(s => s.kelasPerTP?.[tahunPelajaranAktif] === selectedKelas)
    : siswaAktifTP;

  const handleTypeChange = (type) => {
    setSelectedType(type);
    const list = type === 'siswa' ? siswaAktifTP : dataGuru;
    setSelectedPerson(list[0] || null);
    setModeCetak('perorangan');
    setSelectedKelas('');
    setSelectedPeroranganKelas('');
  };

  const handlePrint = () => {
    window.print();
  };

  const renderKartuItem = (person, roleOrClass) => {
    // Barcode unik menggunakan rfid / kodeGuru / nisn di belakang layar
    const kodeUnik = selectedType === 'siswa' 
      ? (person.rfid || person.nisn || `SISWA-${person.id}`)
      : (person.rfid || person.kodeGuru || `GURU-${person.id}`);

    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(kodeUnik)}`;
    const nomorIdentitasSiswa = person.nisn || '-';

    return (
      <div key={person.id || person.rfid} className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full mb-4 break-inside-avoid">
        
        {/* KARTU SISI DEPAN */}
        <div className={`w-[320px] h-[190px] rounded-2xl shadow-xl p-4 flex flex-col justify-between relative overflow-hidden border transition-all ${
          temaDesain === 'dark_gold' ? 'bg-slate-950 text-amber-100 border-amber-500/50' :
          temaDesain === 'minimalist' ? 'bg-white text-slate-900 border-slate-300' :
          'bg-gradient-to-br from-blue-900 to-blue-700 text-white border-blue-500/30'
        }`}>
          <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
          
          <div className={`flex items-center gap-2 border-b pb-2 ${temaDesain === 'minimalist' ? 'border-slate-200' : 'border-white/20'}`}>
            <div className={`w-7 h-7 rounded-md flex items-center justify-center overflow-hidden flex-shrink-0 ${temaDesain === 'minimalist' ? 'bg-slate-900 text-white' : 'bg-white'}`}>
              {infoSekolah.logo ? <img src={infoSekolah.logo} alt="Logo" className="w-full h-full object-cover" /> : <School size={16} className={temaDesain === 'minimalist' ? 'text-white' : 'text-blue-900'} />}
            </div>
            <div className="overflow-hidden leading-tight">
              <p className={`text-[9px] font-bold tracking-widest uppercase ${temaDesain === 'dark_gold' ? 'text-amber-400' : temaDesain === 'minimalist' ? 'text-slate-500' : 'text-blue-200'}`}>Smart ID Card Sekolah</p>
              <p className={`text-[11px] font-extrabold truncate ${temaDesain === 'minimalist' ? 'text-slate-900' : 'text-white'}`}>{infoSekolah.nama}</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between my-auto gap-2">
            <div className="flex items-center gap-2.5 overflow-hidden flex-1">
              <div className={`w-14 h-14 rounded-xl border overflow-hidden flex-shrink-0 shadow flex items-center justify-center font-bold text-sm ${temaDesain === 'minimalist' ? 'border-slate-300 bg-slate-100 text-slate-800' : 'bg-white/20 border-white/40 text-white'}`}>
                {person.foto ? (
                  <img src={person.foto} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <span>{person.nama.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}</span>
                )}
              </div>
              <div className="overflow-hidden flex-1 space-y-0.5">
                <h4 className={`font-bold text-xs truncate ${temaDesain === 'minimalist' ? 'text-slate-900' : 'text-white'}`}>{person.nama}</h4>
                
                {/* TAMPILAN KARTU DEPAN: NISN untuk Siswa, Jabatan untuk Guru (Tanpa teks label kode guru) */}
                {selectedType === 'siswa' ? (
                  <p className={`text-[10px] font-semibold truncate ${temaDesain === 'dark_gold' ? 'text-amber-300' : temaDesain === 'minimalist' ? 'text-blue-600' : 'text-blue-200'}`}>
                    NISN: {nomorIdentitasSiswa}
                  </p>
                ) : (
                  <p className={`text-[10px] font-semibold truncate ${temaDesain === 'dark_gold' ? 'text-amber-300' : temaDesain === 'minimalist' ? 'text-blue-600' : 'text-blue-200'}`}>
                    {person.jabatan_kelas || 'Staff Pengajar'}
                  </p>
                )}

                <div className={`inline-block px-1.5 py-0.2 rounded text-[8px] font-mono mt-1 ${temaDesain === 'minimalist' ? 'bg-slate-200 text-slate-800' : 'bg-white/20'}`}>
                  RFID: {person.rfid || ' - '}
                </div>
              </div>
            </div>
            
            <div className={`w-16 h-16 p-1 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-lg`}>
              <img src={qrCodeUrl} alt="QR Code" className="w-full h-full object-contain" />
            </div>
          </div>

          <div className={`text-[8px] text-right uppercase tracking-wider ${temaDesain === 'dark_gold' ? 'text-amber-400/70' : temaDesain === 'minimalist' ? 'text-slate-400' : 'text-blue-200'}`}>
            RFID + Digital QR Code Support
          </div>
        </div>

        {/* KARTU SISI BELAKANG */}
        <div className={`w-[320px] h-[190px] rounded-2xl shadow-xl p-4 flex flex-col justify-between border transition-all ${
          temaDesain === 'dark_gold' ? 'bg-slate-950 text-amber-100 border-amber-500/50' :
          temaDesain === 'minimalist' ? 'bg-white text-slate-800 border-slate-300' :
          'bg-gradient-to-br from-blue-900 to-blue-700 text-white border-blue-500/30'
        }`}>
          <div className={`border-b pb-1 text-center ${temaDesain === 'minimalist' ? 'border-slate-200' : 'border-white/20'}`}>
            <p className={`text-[9px] font-bold uppercase tracking-widest ${temaDesain === 'dark_gold' ? 'text-amber-400' : temaDesain === 'minimalist' ? 'text-slate-500' : 'text-blue-200'}`}>Ketentuan & Kebijakan</p>
          </div>
          <div className={`text-[9px] space-y-1 text-left leading-relaxed ${temaDesain === 'dark_gold' ? 'text-amber-200/90' : temaDesain === 'minimalist' ? 'text-slate-600' : 'text-blue-100'}`}>
            <p>{teksBelakang1}</p>
            <p>{teksBelakang2}</p>
            <p>{teksBelakang3}</p>
          </div>
          <div className={`pt-2 border-t flex justify-between items-center text-[8px] font-mono ${temaDesain === 'dark_gold' ? 'border-amber-500/30 text-amber-400/70' : temaDesain === 'minimalist' ? 'border-slate-200 text-slate-400' : 'border-white/20 text-blue-200'}`}>
            <span>UID: {person.rfid || ' - '}</span>
            <span>VER: 2026.QR</span>
          </div>
        </div>

      </div>
    );
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          body * { visibility: hidden; }
          #printable-card-area, #printable-card-area * { visibility: visible; }
          #printable-card-area {
            position: absolute; left: 0; top: 0; width: 100%;
            display: flex; flex-wrap: wrap; justify-content: center; gap: 20px;
            background: white !important; box-shadow: none !important;
            padding: 10px; margin: 0;
          }
          .no-print { display: none !important; }
        }
      `}} />

      <div className={`${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-gray-100 text-gray-800'} p-6 rounded-xl shadow-sm border flex flex-col md:flex-row justify-between items-center gap-4 no-print`}>
        <div>
          <h3 className="text-xl font-bold">Studio Desain & Cetak ID Card</h3>
          <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Cetak kartu RFID & QR Code perorangan, per kelas, atau massal guru & staff dengan QR Code aktif.</p>
        </div>
        <button onClick={handlePrint} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 shadow transition cursor-pointer">
          <Printer size={18} /> 
          {modeCetak === 'perorangan' ? 'Cetak Kartu Ini' : 
           modeCetak === 'kelas' ? `Cetak Satu Kelas (${siswaPerKelasList.length} Kartu)` : 
           `Cetak Semua Guru (${dataGuru.length} Kartu)`}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-gray-100'} p-5 rounded-xl shadow-sm border space-y-4 no-print`}>
          
          <div className={`flex ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border'} p-1 rounded-lg`}>
            <button onClick={() => handleTypeChange('siswa')} className={`flex-1 py-2 text-xs font-semibold rounded-md transition cursor-pointer ${selectedType === 'siswa' ? 'bg-blue-600 text-white shadow' : 'opacity-70'}`}>Siswa</button>
            <button onClick={() => handleTypeChange('guru')} className={`flex-1 py-2 text-xs font-semibold rounded-md transition cursor-pointer ${selectedType === 'guru' ? 'bg-blue-600 text-white shadow' : 'opacity-70'}`}>Guru & Staff</button>
          </div>

          {selectedType === 'siswa' && (
            <div>
              <label className={`block text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-gray-500'} uppercase tracking-wider mb-2`}>Mode Cetak Siswa</label>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => setModeCetak('perorangan')}
                  className={`py-2 text-xs font-bold rounded-lg border transition cursor-pointer ${modeCetak === 'perorangan' ? 'bg-blue-600 text-white border-blue-500' : 'bg-slate-800/50 text-slate-400 border-slate-700'}`}
                >
                  Perorangan
                </button>
                <button 
                  onClick={() => setModeCetak('kelas')}
                  className={`py-2 text-xs font-bold rounded-lg border transition cursor-pointer ${modeCetak === 'kelas' ? 'bg-blue-600 text-white border-blue-500' : 'bg-slate-800/50 text-slate-400 border-slate-700'}`}
                >
                  Satu Kelas 🏢
                </button>
              </div>
            </div>
          )}

          {selectedType === 'guru' && (
            <div>
              <label className={`block text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-gray-500'} uppercase tracking-wider mb-2`}>Mode Cetak Guru</label>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => setModeCetak('perorangan')}
                  className={`py-2 text-xs font-bold rounded-lg border transition cursor-pointer ${modeCetak === 'perorangan' ? 'bg-blue-600 text-white border-blue-500' : 'bg-slate-800/50 text-slate-400 border-slate-700'}`}
                >
                  Perorangan
                </button>
                <button 
                  onClick={() => setModeCetak('semua_guru')}
                  className={`py-2 text-xs font-bold rounded-lg border transition cursor-pointer ${modeCetak === 'semua_guru' ? 'bg-blue-600 text-white border-blue-500' : 'bg-slate-800/50 text-slate-400 border-slate-700'}`}
                >
                  Semua Guru 👨‍🏫
                </button>
              </div>
            </div>
          )}

          {selectedType === 'siswa' && modeCetak === 'kelas' ? (
            <div>
              <label className={`block text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-gray-500'} uppercase tracking-wider mb-2`}>Pilih Kelas</label>
              <select 
                value={selectedKelas}
                onChange={(e) => setSelectedKelas(e.target.value)}
                className={`w-full border p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-gray-200'}`}
              >
                <option value="">-- Pilih Kelas --</option>
                {daftarKelasUnik.map((kls, idx) => (
                  <option key={idx} value={kls} className="bg-slate-900 text-white">{kls}</option>
                ))}
              </select>
            </div>
          ) : modeCetak === 'perorangan' && selectedType === 'siswa' ? (
            <div className="space-y-3">
              <div>
                <label className={`block text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-gray-500'} uppercase tracking-wider mb-2`}>Filter Berdasarkan Kelas</label>
                <select 
                  value={selectedPeroranganKelas}
                  onChange={(e) => {
                    setSelectedPeroranganKelas(e.target.value);
                    const filtered = e.target.value ? siswaAktifTP.filter(s => s.kelasPerTP?.[tahunPelajaranAktif] === e.target.value) : siswaAktifTP;
                    setSelectedPerson(filtered[0] || null);
                  }}
                  className={`w-full border p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-gray-200'}`}
                >
                  <option value="">-- Semua Kelas --</option>
                  {daftarKelasUnik.map((kls, idx) => (
                    <option key={idx} value={kls} className="bg-slate-900 text-white">{kls}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={`block text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-gray-500'} uppercase tracking-wider mb-2`}>Pilih Nama Siswa</label>
                <select 
                  value={selectedPerson ? selectedPerson.id : ''}
                  className={`w-full border p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-gray-200'}`} 
                  onChange={(e) => {
                    const found = activeList.find(item => item.id.toString() === e.target.value);
                    setSelectedPerson(found);
                  }}
                >
                  {activeList.length > 0 ? (
                    activeList.map(item => (
                      <option key={item.id} value={item.id} className="bg-slate-900 text-white">
                        {item.nama} ({item.kelasPerTP[tahunPelajaranAktif]})
                      </option>
                    ))
                  ) : (
                    <option value="">Tidak ada siswa di kelas ini</option>
                  )}
                </select>
              </div>
            </div>
          ) : modeCetak === 'perorangan' && selectedType === 'guru' ? (
            <div>
              <label className={`block text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-gray-500'} uppercase tracking-wider mb-2`}>Pilih Nama Guru & Staff</label>
              <select 
                value={selectedPerson ? selectedPerson.id : ''}
                className={`w-full border p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-gray-200'}`} 
                onChange={(e) => {
                  const found = dataGuru.find(item => item.id.toString() === e.target.value);
                  setSelectedPerson(found);
                }}
              >
                {dataGuru.map(item => (
                  <option key={item.id} value={item.id} className="bg-slate-900 text-white">
                    {item.nama} ({item.jabatan_kelas || 'Guru'})
                  </option>
                ))}
              </select>
            </div>
          ) : null}

          <div>
            <label className={`block text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-gray-500'} uppercase tracking-wider mb-2`}>Pilih Tema Desain</label>
            <div className="grid grid-cols-3 gap-2">
              <button 
                onClick={() => setTemaDesain('modern_blue')}
                className={`py-2 px-1 text-[11px] font-bold rounded-lg border transition cursor-pointer ${temaDesain === 'modern_blue' ? 'bg-blue-600 text-white border-blue-500 shadow' : 'bg-slate-800/50 text-slate-400 border-slate-700'}`}
              >
                Modern Blue
              </button>
              <button 
                onClick={() => setTemaDesain('dark_gold')}
                className={`py-2 px-1 text-[11px] font-bold rounded-lg border transition cursor-pointer ${temaDesain === 'dark_gold' ? 'bg-amber-600 text-white border-amber-500 shadow' : 'bg-slate-800/50 text-slate-400 border-slate-700'}`}
              >
                Dark Gold
              </button>
              <button 
                onClick={() => setTemaDesain('minimalist')}
                className={`py-2 px-1 text-[11px] font-bold rounded-lg border transition cursor-pointer ${temaDesain === 'minimalist' ? 'bg-emerald-600 text-white border-emerald-500 shadow' : 'bg-slate-800/50 text-slate-400 border-slate-700'}`}
              >
                Minimalist
              </button>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-700/50">
            <label className={`block text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-gray-500'} uppercase tracking-wider`}>Edit Teks Belakang Kartu</label>
            <input 
              type="text" 
              value={teksBelakang1} 
              onChange={(e) => setTeksBelakang1(e.target.value)}
              className={`w-full border p-2 rounded-lg text-xs ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-gray-200'}`}
            />
            <input 
              type="text" 
              value={teksBelakang2} 
              onChange={(e) => setTeksBelakang2(e.target.value)}
              className={`w-full border p-2 rounded-lg text-xs ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-gray-200'}`}
            />
            <input 
              type="text" 
              value={teksBelakang3} 
              onChange={(e) => setTeksBelakang3(e.target.value)}
              className={`w-full border p-2 rounded-lg text-xs ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-gray-200'}`}
            />
          </div>

        </div>

        <div className={`${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-gray-100'} md:col-span-2 p-8 rounded-xl shadow-sm border flex flex-col items-center justify-center space-y-8 overflow-y-auto max-h-[700px]`}>
          
          {modeCetak === 'perorangan' && selectedPerson ? (
            <div id="printable-card-area" className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full">
              {renderKartuItem(selectedPerson, selectedType === 'siswa' ? selectedPerson.kelasPerTP?.[tahunPelajaranAktif] : selectedPerson.jabatan_kelas)}
            </div>
          ) : modeCetak === 'kelas' ? (
            <div id="printable-card-area" className="flex flex-col items-center gap-6 w-full">
              {selectedKelas ? (
                siswaPerKelasList.length > 0 ? (
                  siswaPerKelasList.map((siswa) => renderKartuItem(siswa, siswa.kelasPerTP?.[tahunPelajaranAktif]))
                ) : (
                  <p className="text-gray-400 text-sm py-12">Tidak ada siswa di kelas {selectedKelas}.</p>
                )
              ) : (
                <p className="text-yellow-400 text-sm py-12 font-semibold">⚠️ Silakan pilih kelas terlebih dahulu pada panel kiri.</p>
              )}
            </div>
          ) : modeCetak === 'semua_guru' ? (
            <div id="printable-card-area" className="flex flex-col items-center gap-6 w-full">
              {dataGuru.length > 0 ? (
                dataGuru.map((guru) => renderKartuItem(guru, guru.jabatan_kelas || 'Guru & Staff'))
              ) : (
                <p className="text-gray-400 text-sm py-12">Belum ada data guru & staff.</p>
              )}
            </div>
          ) : (
            <p className="text-gray-400 text-sm">Belum ada data yang dipilih.</p>
          )}

          <p className="text-xs text-gray-400 italic no-print">*Kartu bersih, profesional, awet dipakai sampai lulus, dan dilengkapi QR Code serta RFID aktif.</p>
        </div>
      </div>
    </div>
  );
};

/* ==============================================================
   11. KOMPONEN PENGATURAN JAM SEKOLAH & JADWAL MENGAJAR GURU
============================================================== */
const KontenPengaturanWaktu = ({ pengaturanJam, setPengaturanJam, dataGuru, setDataGuru, isDarkMode }) => {
  const [subTab, setSubTab] = useState('siswa'); // 'siswa' atau 'guru'

  // State untuk Pengaturan Jam Siswa (3 Mode)
  const [modeAktif, setModeAktif] = useState(pengaturanJam.modeAktif || 'Pagi');
  const [pagi, setPagi] = useState(pengaturanJam.pagi || { jamMasuk: '07:00', ambangTerlambat: '07:15', jamPulang: '13:00' });
  const [siang, setSiang] = useState(pengaturanJam.siang || { jamMasuk: '13:30', ambangTerlambat: '13:45', jamPulang: '18:00' });
  const [fullDay, setFullDay] = useState(pengaturanJam.fullDay || { jamMasuk: '07:00', ambangTerlambat: '07:15', jamPulang: '15:30' });

  const handleSaveSiswa = async (e) => {
    e.preventDefault();
    const dataBaruPengaturan = {
      id: 1, // Kita kunci baris pertama sebagai konfigurasi utama
      mode_aktif: modeAktif,
      pagi: pagi,
      siang: siang,
      full_day: fullDay
    };

    // 1. Simpan ke Supabase Cloud (tabel pengaturan_jam)
    const { error } = await supabase
      .from('pengaturan_jam')
      .upsert([dataBaruPengaturan]);

    if (error) {
      console.error('Gagal menyimpan pengaturan jam:', error.message);
      alert('Gagal menyimpan pengaturan ke database cloud!');
      return;
    }

    // 2. Update state lokal
    setPengaturanJam({
      ...pengaturanJam,
      modeAktif,
      pagi,
      siang,
      fullDay
    });
    alert(`Berhasil! Mode Jam Aktif Siswa saat ini diubah ke: ${modeAktif} dan tersimpan di cloud.`);
  };

  // State untuk Modal Pengaturan Jadwal Mengajar Guru
  const [isJadwalModalOpen, setIsJadwalModalOpen] = useState(false);
  const [selectedGuruJadwal, setSelectedGuruJadwal] = useState(null);
  const [formDataJadwal, setFormDataJadwal] = useState({
    Senin: { aktif: true, jamMulai: '07:30', jamSelesai: '15:00' },
    Selasa: { aktif: true, jamMulai: '07:30', jamSelesai: '15:00' },
    Rabu: { aktif: true, jamMulai: '07:30', jamSelesai: '15:00' },
    Kamis: { aktif: true, jamMulai: '07:30', jamSelesai: '15:00' },
    Jumat: { aktif: true, jamMulai: '07:30', jamSelesai: '14:00' },
  });

  const handleOpenJadwal = (guru) => {
    setSelectedGuruJadwal(guru);
    if (guru.jadwalMengajar) {
      setFormDataJadwal(guru.jadwalMengajar);
    } else {
      setFormDataJadwal({
        Senin: { aktif: true, jamMulai: '07:30', jamSelesai: '15:00' },
        Selasa: { aktif: true, jamMulai: '07:30', jamSelesai: '15:00' },
        Rabu: { aktif: true, jamMulai: '07:30', jamSelesai: '15:00' },
        Kamis: { aktif: true, jamMulai: '07:30', jamSelesai: '15:00' },
        Jumat: { aktif: true, jamMulai: '07:30', jamSelesai: '14:00' },
      });
    }
    setIsJadwalModalOpen(true);
  };

  const handleSaveJadwal = async (e) => {
    e.preventDefault();
    if (!selectedGuruJadwal) return;

    // 1. Update ke Supabase Cloud (tabel guru)
    const { error } = await supabase
      .from('guru')
      .update({ jadwal_mengajar: formDataJadwal })
      .eq('id', selectedGuruJadwal.id);

    if (error) {
      console.error('Gagal menyimpan jadwal guru ke cloud:', error.message);
      alert('Gagal memperbarui jadwal guru di database!');
      return;
    }

    // 2. Update state lokal
    const updatedGuruList = dataGuru.map(g => {
      if (g.id === selectedGuruJadwal.id) {
        return { ...g, jadwalMengajar: formDataJadwal };
      }
      return g;
    });

    setDataGuru(updatedGuruList);
    setIsJadwalModalOpen(false);
    alert(`Jadwal harian untuk ${selectedGuruJadwal.nama} berhasil disimpan ke cloud!`);
  };

  // FUNGSI: TERAPKAN JAM DEFAULT MASSAL (06.45 - 14.00) UNTUK SEMUA GURU
  const handleTerapkanDefaultSemuaGuru = async () => {
    if (window.confirm('Apakah Anda yakin ingin menerapkan jadwal default (Masuk: 06.45, Pulang: 14.00, Senin-Jumat) ke SEMUA guru secara serentak ke cloud?')) {
      const defaultJadwalMasal = {
        Senin: { aktif: true, jamMulai: '06:45', jamSelesai: '14:00' },
        Selasa: { aktif: true, jamMulai: '06:45', jamSelesai: '14:00' },
        Rabu: { aktif: true, jamMulai: '06:45', jamSelesai: '14:00' },
        Kamis: { aktif: true, jamMulai: '06:45', jamSelesai: '14:00' },
        Jumat: { aktif: true, jamMulai: '06:45', jamSelesai: '14:00' },
      };

      // Update massal ke Supabase untuk semua guru
      for (let guru of dataGuru) {
        await supabase
          .from('guru')
          .update({ jadwal_mengajar: defaultJadwalMasal })
          .eq('id', guru.id);
      }

      const updatedGuruList = dataGuru.map(g => ({
        ...g,
        jadwalMengajar: defaultJadwalMasal
      }));

      setDataGuru(updatedGuruList);
      alert('Berhasil! Seluruh jadwal guru telah diset serentak ke jam 06.45 - 14.00 di cloud.');
    }
  };

  const sortedDataGuru = dataGuru ? [...dataGuru].sort((a, b) => a.nama.localeCompare(b.nama)) : [];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* TOMBOL PEMILIH SUB-TAB (SISWA VS GURU) */}
      <div className={`${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'} p-3 rounded-xl shadow-sm border flex items-center justify-between gap-4`}>
        <div className={`flex ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-gray-100'} p-1 rounded-xl w-full md:w-auto`}>
          <button 
            onClick={() => setSubTab('siswa')} 
            className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${subTab === 'siswa' ? 'bg-blue-600 text-white shadow' : 'opacity-60'}`}
          >
            ⏰ Jam Masuk & Pulang Siswa
          </button>
          <button 
            onClick={() => setSubTab('guru')} 
            className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${subTab === 'guru' ? 'bg-blue-600 text-white shadow' : 'opacity-60'}`}
          >
            👨‍🏫 Jadwal Harian Mengajar Guru
          </button>
        </div>
      </div>

      {/* KONTEN 1: PENGATURAN JAM SISWA */}
      {subTab === 'siswa' && (
        <div className="space-y-6">
          <div className={`${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-gray-100 text-gray-800'} p-6 rounded-xl shadow-sm border flex flex-col md:flex-row justify-between items-center gap-4`}>
            <div>
              <h3 className="text-xl font-bold flex items-center gap-2"><Clock className="text-blue-600"/> Pengaturan 3 Mode Jam Sekolah</h3>
              <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Pilih mode operasional yang sedang berjalan dan sesuaikan jam masuk/pulang (Tersinkronisasi Cloud).</p>
            </div>
            <div className="w-full md:w-auto">
              <label className={`block text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-gray-500'} uppercase tracking-wider mb-1`}>Pilih Mode Aktif Saat Ini</label>
              <select 
                value={modeAktif} 
                onChange={(e) => setModeAktif(e.target.value)}
                className={`border-2 border-blue-500 font-bold px-4 py-2 rounded-xl text-sm focus:outline-none w-full md:w-48 ${isDarkMode ? 'bg-slate-800 text-blue-300' : 'bg-blue-50 text-blue-800'}`}
              >
                <option value="Pagi" className="bg-slate-900 text-white">Mode Pagi</option>
                <option value="Siang" className="bg-slate-900 text-white">Mode Siang</option>
                <option value="Full Day" className="bg-slate-900 text-white">Full Day School</option>
              </select>
            </div>
          </div>

          <form onSubmit={handleSaveSiswa} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-gray-200 text-gray-800'} p-6 rounded-xl shadow-sm border ${modeAktif === 'Pagi' ? 'border-blue-500 ring-2 ring-blue-500/20' : ''} space-y-4`}>
              <div className={`flex justify-between items-center border-b pb-3 ${isDarkMode ? 'border-slate-800' : ''}`}>
                <h4 className="font-bold">Shift Pagi</h4>
                {modeAktif === 'Pagi' && <span className="bg-blue-500/20 text-blue-400 text-xs font-bold px-2 py-0.5 rounded border border-blue-500/30">Aktif</span>}
              </div>
              <div>
                <label className={`block text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-gray-600'} mb-1`}>Jam Masuk</label>
                <input type="time" value={pagi.jamMasuk} onChange={(e) => setPagi({...pagi, jamMasuk: e.target.value})} className={`w-full border p-2.5 rounded-lg text-sm ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : ''}`} required />
              </div>
              <div>
                <label className={`block text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-gray-600'} mb-1`}>Batas Terlambat</label>
                <input type="time" value={pagi.ambangTerlambat} onChange={(e) => setPagi({...pagi, ambangTerlambat: e.target.value})} className={`w-full border p-2.5 rounded-lg text-sm ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : ''}`} required />
              </div>
              <div>
                <label className={`block text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-gray-600'} mb-1`}>Jam Pulang</label>
                <input type="time" value={pagi.jamPulang} onChange={(e) => setPagi({...pagi, jamPulang: e.target.value})} className={`w-full border p-2.5 rounded-lg text-sm ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : ''}`} required />
              </div>
            </div>

            <div className={`${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-gray-200 text-gray-800'} p-6 rounded-xl shadow-sm border ${modeAktif === 'Siang' ? 'border-blue-500 ring-2 ring-blue-500/20' : ''} space-y-4`}>
              <div className={`flex justify-between items-center border-b pb-3 ${isDarkMode ? 'border-slate-800' : ''}`}>
                <h4 className="font-bold">Shift Siang</h4>
                {modeAktif === 'Siang' && <span className="bg-blue-500/20 text-blue-400 text-xs font-bold px-2 py-0.5 rounded border border-blue-500/30">Aktif</span>}
              </div>
              <div>
                <label className={`block text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-gray-600'} mb-1`}>Jam Masuk</label>
                <input type="time" value={siang.jamMasuk} onChange={(e) => setSiang({...siang, jamMasuk: e.target.value})} className={`w-full border p-2.5 rounded-lg text-sm ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : ''}`} required />
              </div>
              <div>
                <label className={`block text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-gray-600'} mb-1`}>Batas Terlambat</label>
                <input type="time" value={siang.ambangTerlambat} onChange={(e) => setSiang({...siang, ambangTerlambat: e.target.value})} className={`w-full border p-2.5 rounded-lg text-sm ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : ''}`} required />
              </div>
              <div>
                <label className={`block text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-gray-600'} mb-1`}>Jam Pulang</label>
                <input type="time" value={siang.jamPulang} onChange={(e) => setSiang({...siang, jamPulang: e.target.value})} className={`w-full border p-2.5 rounded-lg text-sm ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : ''}`} required />
              </div>
            </div>

            <div className={`${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-gray-200 text-gray-800'} p-6 rounded-xl shadow-sm border ${modeAktif === 'Full Day' ? 'border-blue-500 ring-2 ring-blue-500/20' : ''} space-y-4`}>
              <div className={`flex justify-between items-center border-b pb-3 ${isDarkMode ? 'border-slate-800' : ''}`}>
                <h4 className="font-bold">Full Day School</h4>
                {modeAktif === 'Full Day' && <span className="bg-blue-500/20 text-blue-400 text-xs font-bold px-2 py-0.5 rounded border border-blue-500/30">Aktif</span>}
              </div>
              <div>
                <label className={`block text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-gray-600'} mb-1`}>Jam Masuk</label>
                <input type="time" value={fullDay.jamMasuk} onChange={(e) => setFullDay({...fullDay, jamMasuk: e.target.value})} className={`w-full border p-2.5 rounded-lg text-sm ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : ''}`} required />
              </div>
              <div>
                <label className={`block text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-gray-600'} mb-1`}>Batas Terlambat</label>
                <input type="time" value={fullDay.ambangTerlambat} onChange={(e) => setFullDay({...fullDay, ambangTerlambat: e.target.value})} className={`w-full border p-2.5 rounded-lg text-sm ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : ''}`} required />
              </div>
              <div>
                <label className={`block text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-gray-600'} mb-1`}>Jam Pulang</label>
                <input type="time" value={fullDay.jamPulang} onChange={(e) => setFullDay({...fullDay, jamPulang: e.target.value})} className={`w-full border p-2.5 rounded-lg text-sm ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : ''}`} required />
              </div>
            </div>

            <div className="md:col-span-3">
              <button type="submit" className="w-full bg-blue-600 text-white font-medium py-3.5 rounded-xl hover:bg-blue-700 transition shadow cursor-pointer">
                Simpan & Terapkan Pengaturan Jam Siswa ke Cloud
              </button>
            </div>
          </form>
        </div>
      )}

      {/* KONTEN 2: PENGATURAN JADWAL MENGAJAR GURU */}
      {subTab === 'guru' && (
        <div className={`${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-gray-100 text-gray-800'} p-6 rounded-xl shadow-sm border space-y-4`}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-xl font-bold flex items-center gap-2"><Calendar className="text-purple-600"/> Jadwal Mengajar Harian Guru (Masuk & Pulang)</h3>
              <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Atur jam mulai dan jam selesai mengajar harian (Senin - Jumat) untuk masing-masing guru.</p>
            </div>
            
            <button 
              onClick={handleTerapkanDefaultSemuaGuru}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold cursor-pointer shadow transition flex items-center gap-2 whitespace-nowrap"
              title="Set semua guru masuk 06.45 dan pulang 14.00 (Senin - Jumat)"
            >
              ⚡ Set Default Semua Guru (06.45 - 14.00)
            </button>
          </div>

          <div className={`border rounded-xl overflow-hidden ${isDarkMode ? 'border-slate-800' : 'border-gray-200'}`}>
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className={`${isDarkMode ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-gray-100 text-gray-700 border-b'} text-xs uppercase`}>
                  <th className="px-4 py-3">No</th>
                  <th className="px-4 py-3">Nama & Jabatan Guru</th>
                  <th className="px-4 py-3">Status Jadwal Harian</th>
                  <th className="px-4 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDarkMode ? 'divide-slate-800' : 'divide-gray-100'}`}>
                {sortedDataGuru && sortedDataGuru.length > 0 ? (
                  sortedDataGuru.map((guru, idx) => (
                    <tr key={guru.id} className={`${isDarkMode ? 'hover:bg-slate-800/50' : 'hover:bg-gray-50'}`}>
                      <td className="px-4 py-3">{idx + 1}</td>
                      <td className="px-4 py-3">
                        <div className="font-bold">{guru.nama}</div>
                        <div className="text-xs text-blue-500">{guru.jabatan_kelas || 'Guru'}</div>
                      </td>
                      <td className="px-4 py-3 text-xs">
                        {guru.jadwalMengajar ? (
                          <span className="text-green-500 font-semibold">✓ Jadwal Terkonfigurasi</span>
                        ) : (
                          <span className="text-amber-500">⚠️ Belum diatur (Default: 07:30 - 15:00)</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button 
                          onClick={() => handleOpenJadwal(guru)}
                          className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-semibold cursor-pointer shadow transition flex items-center gap-1.5 ml-auto"
                        >
                          <Calendar size={14} /> Atur Jadwal Harian
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-8 text-gray-400 italic">Belum ada data guru & staff.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL EDIT JADWAL MENGAJAR & PULANG PER GURU */}
      {isJadwalModalOpen && selectedGuruJadwal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className={`${isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white text-gray-800'} w-full max-w-xl rounded-2xl shadow-xl overflow-hidden`}>
            <div className={`flex justify-between p-6 border-b ${isDarkMode ? 'border-slate-800' : 'border-gray-100'}`}>
              <div>
                <h3 className="font-bold text-base flex items-center gap-2">
                  <Calendar className="text-purple-600" /> Atur Jadwal Masuk & Pulang Guru
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Guru: <span className="font-semibold text-blue-400">{selectedGuruJadwal.nama}</span></p>
              </div>
              <button onClick={() => setIsJadwalModalOpen(false)} className="cursor-pointer"><X size={20}/></button>
            </div>
            
            <form onSubmit={handleSaveJadwal}>
              <div className="p-6 space-y-3 max-h-[60vh] overflow-y-auto">
                <p className="text-xs text-slate-400 italic mb-2">Tentukan hari aktif mengajar beserta jam masuk dan jam selesainya. Nonaktifkan centang jika tidak ada jadwal di hari tersebut.</p>
                
                {Object.keys(formDataJadwal).map((hari) => (
                  <div key={hari} className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl border ${isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="flex items-center gap-3">
                      <input 
                        type="checkbox"
                        checked={formDataJadwal[hari].aktif}
                        onChange={(e) => {
                          const val = e.target.checked;
                          setFormDataJadwal(prev => ({
                            ...prev,
                            [hari]: { ...prev[hari], aktif: val }
                          }));
                        }}
                        className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                      />
                      <span className="font-bold text-sm w-20">{hari}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] text-slate-400">Masuk:</span>
                        <input 
                          type="time" 
                          disabled={!formDataJadwal[hari].aktif}
                          value={formDataJadwal[hari].jamMulai}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFormDataJadwal(prev => ({
                              ...prev,
                              [hari]: { ...prev[hari], jamMulai: val }
                            }));
                          }}
                          className={`p-1.5 border rounded-lg text-xs font-mono ${!formDataJadwal[hari].aktif ? 'opacity-40 cursor-not-allowed' : ''} ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white'}`}
                        />
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] text-slate-400">Pulang:</span>
                        <input 
                          type="time" 
                          disabled={!formDataJadwal[hari].aktif}
                          value={formDataJadwal[hari].jamSelesai}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFormDataJadwal(prev => ({
                              ...prev,
                              [hari]: { ...prev[hari], jamSelesai: val }
                            }));
                          }}
                          className={`p-1.5 border rounded-lg text-xs font-mono ${!formDataJadwal[hari].aktif ? 'opacity-40 cursor-not-allowed' : ''} ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white'}`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className={`p-4 border-t ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-gray-50'} flex justify-end gap-3`}>
                <button type="button" onClick={() => setIsJadwalModalOpen(false)} className="px-4 py-2 rounded-lg text-sm cursor-pointer">Batal</button>
                <button type="submit" className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium cursor-pointer shadow">Simpan Jadwal ke Cloud</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

/* ==============================================================
   12. KOMPONEN PENGATURAN UMUM, AKUN ADMIN & AUDIO PIKET
============================================================== */
const KontenPengaturanUmum = ({ infoSekolah, setInfoSekolah, adminCredential, setAdminCredential, pengaturanAudio, setPengaturanAudio, isDarkMode }) => {
  const [namaSekolah, setNamaSekolah] = useState(infoSekolah.nama || '');
  const [alamatSekolah, setAlamatSekolah] = useState(infoSekolah.alamat || '');
  const [pengumuman, setPengumuman] = useState(infoSekolah.pengumuman || '');
  const [logoPreview, setLogoPreview] = useState(infoSekolah.logo || '');

  const [newUsername, setNewUsername] = useState(adminCredential.username || '');
  const [newPassword, setNewPassword] = useState(adminCredential.password || '');

  // State Pengaturan Audio Kustom (Termasuk Tidak Dikenal)
  const [audioAktif, setAudioAktif] = useState(pengaturanAudio?.aktif ?? true);
  const [audioBerhasil, setAudioBerhasil] = useState(pengaturanAudio?.berhasil || '');
  const [audioPulang, setAudioPulang] = useState(pengaturanAudio?.pulang || '');
  const [audioTerlambat, setAudioTerlambat] = useState(pengaturanAudio?.terlambat || '');
  const [audioTidakDikenal, setAudioTidakDikenal] = useState(pengaturanAudio?.tidakDikenal || '');

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) setLogoPreview(URL.createObjectURL(file));
  };

  // Handler untuk upload file audio MP3 dan konversi ke Base64 (Permanen)
  const handleAudioUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        if (type === 'berhasil') setAudioBerhasil(base64String);
        if (type === 'pulang') setAudioPulang(base64String);
        if (type === 'terlambat') setAudioTerlambat(base64String);
        if (type === 'tidakDikenal') setAudioTidakDikenal(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const dataBaruSekolah = {
      nama: namaSekolah,
      alamat: alamatSekolah,
      logo: logoPreview,
      pengumuman: pengumuman
    };

    // 1. Simpan ke Database Cloud Supabase secara Real-time
    try {
      // Kita ambil dulu data pengaturan yang ada di Supabase untuk tahu ID-nya
      const { data: existingData } = await supabase.from('pengaturan').select('id').limit(1);
      
      const targetId = existingData && existingData.length > 0 ? existingData[0].id : 1;

      const { error } = await supabase
        .from('pengaturan')
        .upsert({ 
          id: targetId, // Menggunakan ID yang sedang aktif di database (misal ID 2)
          ...dataBaruSekolah 
        });

      if (error) {
        console.error('Gagal menyimpan ke Supabase:', error.message);
        alert('Gagal menyinkronkan pengaturan ke cloud Supabase: ' + error.message);
        return;
      }
    } catch (err) {
      console.error('Error Supabase:', err);
    }

    // 2. Perbarui State Lokal & LocalStorage
    setInfoSekolah(dataBaruSekolah);
    setAdminCredential({ username: newUsername, password: newPassword });
    
    // Simpan pengaturan audio lengkap dengan kartu tidak dikenal
    if (setPengaturanAudio) {
      setPengaturanAudio({
        aktif: audioAktif,
        berhasil: audioBerhasil,
        pulang: audioPulang,
        terlambat: audioTerlambat,
        tidakDikenal: audioTidakDikenal
      });
    }

    alert('Pengaturan umum sekolah berhasil disimpan ke Supabase & lokal!');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className={`${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-gray-100 text-gray-800'} p-8 rounded-xl shadow-sm border space-y-6`}>
        <h3 className="text-xl font-bold flex items-center gap-2"><Settings className="text-blue-600"/> Pengaturan Umum Sekolah & Akun Admin</h3>
        
        <form onSubmit={handleSave} className="space-y-5">
          <div>
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-gray-700'} mb-1`}>Nama Sekolah / Instansi</label>
            <input type="text" value={namaSekolah} onChange={(e) => setNamaSekolah(e.target.value)} className={`w-full border p-3 rounded-lg text-sm ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : ''}`} required />
          </div>

          <div>
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-gray-700'} mb-1`}>Alamat Sekolah</label>
            <textarea
              rows="2"
              value={alamatSekolah}
              onChange={(e) => setAlamatSekolah(e.target.value)}
              className={`w-full border p-3 rounded-lg text-sm ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : ''}`}
              placeholder="Masukkan alamat lengkap sekolah..."
              required
            />
          </div>

          <div>
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-gray-700'} mb-1`}>Teks Pengumuman (Running Text Layar TV)</label>
            <textarea
              rows="3"
              value={pengumuman}
              onChange={(e) => setPengumuman(e.target.value)}
              className={`w-full border p-3 rounded-lg text-sm ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : ''}`}
              placeholder="Tuliskan pengumuman yang akan berjalan di layar TV informasi..."
            />
          </div>

          {/* PENGATURAN AUDIO KUSTOM PIKET */}
          <div className={`border-t pt-5 space-y-4 ${isDarkMode ? 'border-slate-800' : 'border-gray-200'}`}>
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-sm flex items-center gap-2">
                <Volume2 size={16} className="text-blue-600" /> Pengaturan Suara Audio Mode Piket (MP3)
              </h4>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={audioAktif}
                  onChange={(e) => setAudioAktif(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                <span className={`ml-2 text-xs font-semibold ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>{audioAktif ? 'Aktif' : 'Mati'}</span>
              </label>
            </div>

            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
              Unggah file audio format MP3 buatan Anda sendiri agar suara sapaan di gerbang terdengar natural dan jelas.
            </p>

            <div className="grid grid-cols-1 gap-3 pt-2">
              <div>
                <label className={`block text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-gray-600'} mb-1`}>Audio Sukses / Datang (Berhasil)</label>
                <input type="file" accept="audio/mp3,audio/*" onChange={(e) => handleAudioUpload(e, 'berhasil')} className={`block w-full text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'} file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer`} />
                {audioBerhasil && <span className="text-[10px] text-emerald-400 mt-1 block">&checkmark; File audio berhasil dipilih</span>}
              </div>

              <div>
                <label className={`block text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-gray-600'} mb-1`}>Audio Sukses Pulang</label>
                <input type="file" accept="audio/mp3,audio/*" onChange={(e) => handleAudioUpload(e, 'pulang')} className={`block w-full text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'} file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer`} />
                {audioPulang && <span className="text-[10px] text-emerald-400 mt-1 block">&checkmark; File audio berhasil dipilih</span>}
              </div>

              <div>
                <label className={`block text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-gray-600'} mb-1`}>Audio Terlambat</label>
                <input type="file" accept="audio/mp3,audio/*" onChange={(e) => handleAudioUpload(e, 'terlambat')} className={`block w-full text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'} file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer`} />
                {audioTerlambat && <span className="text-[10px] text-emerald-400 mt-1 block">&checkmark; File audio berhasil dipilih</span>}
              </div>

              {/* Tambahan Slot Audio Kartu Tidak Dikenal */}
              <div>
                <label className={`block text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-gray-600'} mb-1`}>Audio Kartu Tidak Dikenal / Belum Terdaftar</label>
                <input type="file" accept="audio/mp3,audio/*" onChange={(e) => handleAudioUpload(e, 'tidakDikenal')} className={`block w-full text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'} file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer`} />
                {audioTidakDikenal && <span className="text-[10px] text-emerald-400 mt-1 block">&checkmark; File audio berhasil dipilih</span>}
              </div>
            </div>
          </div>

          <div className={`border-t pt-4 space-y-4 ${isDarkMode ? 'border-slate-800' : ''}`}>
            <h4 className="font-bold text-sm flex items-center gap-2">
              <Lock size={16} className="text-blue-600" /> Kredensial Login Administrator
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-gray-600'} mb-1`}>Username Admin Baru</label>
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className={`w-full border p-2.5 rounded-lg text-sm font-mono ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : ''}`}
                  required
                />
              </div>
              <div>
                <label className={`block text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-gray-600'} mb-1`}>Password Admin Baru</label>
                <input
                  type="text"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={`w-full border p-2.5 rounded-lg text-sm font-mono ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : ''}`}
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-gray-700'} mb-1`}>Logo Sekolah</label>
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 border rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-gray-50'} overflow-hidden flex-shrink-0`}>
                {logoPreview ? <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" /> : <School size={28} className="text-gray-400" />}
              </div>
              <input type="file" accept="image/*" onChange={handleLogoChange} className={`block w-full text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-500'} file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer`} />
            </div>
          </div>

          <button type="submit" className="bg-blue-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-700 transition shadow w-full cursor-pointer">Simpan Perubahan</button>
        </form>
      </div>
    </div>
  );
};

/* ==============================================================
   13. KOMPONEN REKAPITULASI & CETAK RAPOR ABSENSI
============================================================== */
const KontenRekapitulasi = ({ logKehadiran, arsipAbsensi, setArsipAbsensi, dataSiswa, dataGuru, dataPelanggaran, infoSekolah, isDarkMode, tahunPelajaranAktif }) => {
  const [viewingArsip, setViewingArsip] = useState(null);
  const [searchArsip, setSearchArsip] = useState('');
  
  const siswaAktifTP = dataSiswa.filter(s => (s.statusTP?.[tahunPelajaranAktif] || 'Aktif') === 'Aktif' && s.kelasPerTP?.[tahunPelajaranAktif]);
  const daftarKelas = ['Semua', ...new Set(siswaAktifTP.map(s => s.kelasPerTP[tahunPelajaranAktif]))];
  const [selectedKelas, setSelectedKelas] = useState('Semua');
  const [selectedPeriode, setSelectedPeriode] = useState('Bulanan'); 

  // STATE: PILIH BULAN & TAHUN SPESIFIK
  const currentNomorBulan = new Date().getMonth() + 1; // 1 - 12
  const currentTahunStr = new Date().getFullYear().toString();
  const [selectedBulan, setSelectedBulan] = useState(currentNomorBulan.toString());
  const [selectedTahun, setSelectedTahun] = useState(currentTahunStr);

  const listBulanOpsi = [
    { id: '1', nama: 'Januari' }, { id: '2', nama: 'Februari' }, { id: '3', nama: 'Maret' },
    { id: '4', nama: 'April' }, { id: '5', nama: 'Mei' }, { id: '6', nama: 'Juni' },
    { id: '7', nama: 'Juli' }, { id: '8', nama: 'Agustus' }, { id: '9', nama: 'September' },
    { id: '10', nama: 'Oktober' }, { id: '11', nama: 'November' }, { id: '12', nama: 'Desember' }
  ];

  const siswaFiltered = selectedKelas === 'Semua' 
    ? siswaAktifTP 
    : siswaAktifTP.filter(s => s.kelasPerTP[tahunPelajaranAktif] === selectedKelas);

  const [selectedSiswaId, setSelectedSiswaId] = useState(siswaFiltered[0]?.id || '');
  const [showRaporModal, setShowRaporModal] = useState(false);

  // MENGGABUNGKAN LOG HARIAN AKTIF DAN SELURUH DATA DARI ARSIRP TUTUP BUKU
  const allArsippedLogs = arsipAbsensi ? arsipAbsensi.flatMap(arsip => arsip.data || []) : [];
  const rawMasterLog = [...logKehadiran, ...allArsippedLogs];
  const uniqueMasterLog = Array.from(new Map(rawMasterLog.map(item => [item.id, item])).values());

  const currentLogKehadiran = uniqueMasterLog.filter(l => l.tahunPelajaran === tahunPelajaranAktif);
  const currentPelanggaran = dataPelanggaran.filter(p => p.tahunPelajaran === tahunPelajaranAktif);

  const handleKelasChange = (kelasBaru) => {
    setSelectedKelas(kelasBaru);
    const listSiswa = kelasBaru === 'Semua' ? siswaAktifTP : siswaAktifTP.filter(s => s.kelasPerTP[tahunPelajaranAktif] === kelasBaru);
    if (listSiswa.length > 0) {
      setSelectedSiswaId(listSiswa[0].id);
    } else {
      setSelectedSiswaId('');
    }
  };

  // FUNGSI MATRIKS BULANAN SPESIFIK (DENGAN KOLOM LUAR JADWAL)
  const generateMatriksBulananSpesifik = (listWargaRaw, logKehadiranList, isSiswa = false, bulanTarget, tahunTarget) => {
    const listWarga = [...listWargaRaw].sort((a, b) => (a.nama || '').localeCompare(b.nama || '', 'id', { sensitivity: 'base' }));

    const bTarget = parseInt(bulanTarget) - 1; // 0 - 11
    const tTarget = parseInt(tahunTarget);
    const jumlahHari = new Date(tTarget, bTarget + 1, 0).getDate(); 
    const namaHariArr = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

    const rowHeader1 = isSiswa ? [
      'No', 'Nama Siswa', 'Kelas', 'Hadir', 'Tepat Waktu', 'Telat', 'Sakit', 'Izin', 'Alpa'
    ] : [
      'No', 'Nama', 'Divisi', 'Hadir', 'Tepat Waktu', 'Telat', 'Luar Jadwal', 'Sakit', 'Izin', 'Alpa'
    ];
    
    const rowHeader2 = isSiswa ? ['', '', '', '', '', '', '', '', ''] : ['', '', '', '', '', '', '', '', '', ''];

    for (let d = 1; d <= jumlahHari; d++) {
      const dateObj = new Date(tTarget, bTarget, d);
      const namaHari = namaHariArr[dateObj.getDay()];
      rowHeader1.push(`${d} ${namaHari}`, '');
      rowHeader2.push('Datang', 'Pulang');
    }

    const rows = [rowHeader1, rowHeader2];

    listWarga.forEach((warga, index) => {
      const namaWarga = warga.nama;
      const roleTarget = isSiswa ? 'siswa' : 'guru';
      
      const logWarga = logKehadiranList.filter(l => {
        if (l.role !== roleTarget || l.nama.toLowerCase() !== namaWarga.toLowerCase()) return false;
        if (!l.tanggal) return false;
        const namaBulanArr = ['jan', 'feb', 'mar', 'apr', 'mei', 'jun', 'jul', 'agu', 'sep', 'okt', 'nov', 'des'];
        const targetBulanNama = listBulanOpsi[bTarget].nama.toLowerCase();
        const tglLower = l.tanggal.toLowerCase();
        
        const matchBulan = tglLower.includes(targetBulanNama) || tglLower.includes(namaBulanArr[bTarget]);
        const matchTahun = tglLower.includes(tTarget.toString());
        return matchBulan && matchTahun;
      });

      let tepatWaktu = 0;
      let telat = 0;
      let luarJadwal = 0;
      let sakit = 0;
      let izin = 0;
      let alpa = 0;

      logWarga.forEach(l => {
        if (['Tepat Waktu', 'Hadir'].includes(l.status)) tepatWaktu++;
        else if (l.status === 'Terlambat') telat++;
        else if (l.status === 'Hadir (Luar Jadwal)') luarJadwal++;
        else if (l.status === 'Sakit') sakit++;
        else if (l.status === 'Izin') izin++;
        else if (l.status === 'Alpa') alpa++;
      });

      const totalHadirWarga = isSiswa ? (tepatWaktu + telat) : (tepatWaktu + telat + luarJadwal);

      const rowData = isSiswa ? [
        index + 1, namaWarga,
        warga.kelasPerTP?.[tahunPelajaranAktif] || warga.kelas || '-',
        totalHadirWarga, tepatWaktu, telat, sakit, izin, alpa
      ] : [
        index + 1, namaWarga,
        warga.jabatan || 'Guru',
        totalHadirWarga, tepatWaktu, telat, luarJadwal, sakit, izin, alpa
      ];

      for (let d = 1; d <= jumlahHari; d++) {
        const dateObj = new Date(tTarget, bTarget, d);
        const namaHari = namaHariArr[dateObj.getDay()];

        const absensiHariIni = logWarga.find(l => {
          if (!l.tanggal) return false;
          const angkaTanggalMatch = l.tanggal.match(/\d+/);
          if (!angkaTanggalMatch) return false;
          return parseInt(angkaTanggalMatch[0], 10) === d;
        });

        if (absensiHariIni) {
          if (['Sakit', 'Izin', 'Alpa'].includes(absensiHariIni.status)) {
            const kodeStatus = absensiHariIni.status === 'Sakit' ? 'S' : absensiHariIni.status === 'Izin' ? 'I' : 'A';
            rowData.push(kodeStatus, kodeStatus);
          } else {
            rowData.push(absensiHariIni.waktuDatang || '-', absensiHariIni.waktuPulang || '-');
          }
        } else {
          if (dateObj.getDay() === 0) {
            rowData.push('Libur', 'Libur');
          } else if (!isSiswa) {
            const jadwalMap = warga.jadwalMengajar || warga.jadwal || {};
            const jadwalHariIni = jadwalMap[namaHari] || jadwalMap[namaHari.toLowerCase()];

            if (jadwalHariIni && jadwalHariIni.aktif === false) {
              rowData.push('Libur Mengajar', 'Libur Mengajar');
            } else if (!jadwalHariIni) {
              rowData.push('Tidak Ada Jadwal', 'Tidak Ada Jadwal');
            } else {
              rowData.push('-', '-');
            }
          } else {
            rowData.push('-', '-');
          }
        }
      }

      rows.push(rowData);
    });

    return rows;
  };

  // FUNGSI MATRIKS AKUMULASI PER BULAN
  const generateMatriksAkumulasiPeriode = (listWargaRaw, logKehadiranList, isSiswa = false, jumlahBulanMundur) => {
    const listWarga = [...listWargaRaw].sort((a, b) => (a.nama || '').localeCompare(b.nama || '', 'id', { sensitivity: 'base' }));

    const now = new Date();
    const currentBulanIdx = now.getMonth(); // 0 - 11
    const currentTahun = now.getFullYear();

    const targetBulanList = [];
    for (let i = jumlahBulanMundur - 1; i >= 0; i--) {
      let bIdx = currentBulanIdx - i;
      let tahunVal = currentTahun;
      while (bIdx < 0) {
        bIdx += 12;
        tahunVal -= 1;
      }
      targetBulanList.push({ bulanIdx: bIdx, tahun: tahunVal, namaBulan: listBulanOpsi[bIdx].nama });
    }

    const rowHeader = [
      'No', 
      isSiswa ? 'Nama Siswa' : 'Nama', 
      isSiswa ? 'Kelas' : 'Divisi'
    ];

    targetBulanList.forEach(tb => {
      if (isSiswa) {
        rowHeader.push(`${tb.namaBulan} Hadir`, `${tb.namaBulan} Tepat Waktu`, `${tb.namaBulan} Telat`, `${tb.namaBulan} Sakit`, `${tb.namaBulan} Izin`, `${tb.namaBulan} Alpa`);
      } else {
        rowHeader.push(`${tb.namaBulan} Hadir`, `${tb.namaBulan} Tepat Waktu`, `${tb.namaBulan} Telat`, `${tb.namaBulan} Luar Jadwal`, `${tb.namaBulan} Sakit`, `${tb.namaBulan} Izin`, `${tb.namaBulan} Alpa`);
      }
    });
    rowHeader.push('Total Hadir', 'Total Sakit', 'Total Izin', 'Total Alpa');

    const rows = [rowHeader];

    listWarga.forEach((warga, index) => {
      const namaWarga = warga.nama;
      const roleTarget = isSiswa ? 'siswa' : 'guru';
      const logWarga = logKehadiranList.filter(l => l.role === roleTarget && l.nama.toLowerCase() === namaWarga.toLowerCase());

      const rowData = [
        index + 1, namaWarga,
        isSiswa ? (warga.kelasPerTP?.[tahunPelajaranAktif] || warga.kelas || '-') : (warga.jabatan || 'Guru')
      ];

      let grandTotalHadir = 0;
      let grandTotalSakit = 0;
      let grandTotalIzin = 0;
      let grandTotalAlpa = 0;

      targetBulanList.forEach(tb => {
        const logBulanIni = logWarga.filter(l => {
          if (!l.tanggal) return false;
          const nBulanStr = tb.namaBulan.toLowerCase();
          const tglLower = l.tanggal.toLowerCase();
          return tglLower.includes(nBulanStr) && tglLower.includes(tb.tahun.toString());
        });

        let tWaktu = 0;
        let telat = 0;
        let luarJadw = 0;
        let sakt = 0;
        let izn = 0;
        let alp = 0;

        logBulanIni.forEach(l => {
          if (['Tepat Waktu', 'Hadir'].includes(l.status)) tWaktu++;
          else if (l.status === 'Terlambat') telat++;
          else if (l.status === 'Hadir (Luar Jadwal)') luarJadw++;
          else if (l.status === 'Sakit') sakt++;
          else if (l.status === 'Izin') izn++;
          else if (l.status === 'Alpa') alp++;
        });

        const totalHdrBulanIni = tWaktu + telat + luarJadw;
        grandTotalHadir += totalHdrBulanIni;
        grandTotalSakit += sakt;
        grandTotalIzin += izn;
        grandTotalAlpa += alp;

        if (isSiswa) {
          rowData.push(totalHdrBulanIni, tWaktu, telat, sakt, izn, alp);
        } else {
          rowData.push(totalHdrBulanIni, tWaktu, telat, luarJadw, sakt, izn, alp);
        }
      });

      rowData.push(grandTotalHadir, grandTotalSakit, grandTotalIzin, grandTotalAlpa);
      rows.push(rowData);
    });

    return rows;
  };

  // EXPORT HANDLER BERDASARKAN PERIODE
  const handleExportBerkala = (tipeTarget) => {
    if (typeof XLSX === 'undefined') { alert('Library XLSX belum dimuat!'); return; }
    const wb = XLSX.utils.book_new();

    const listGuru = dataGuru && dataGuru.length > 0 ? dataGuru : [];
    const daftarKelasUnik = [...new Set(siswaAktifTP.map(s => s.kelasPerTP[tahunPelajaranAktif]))];

    if (selectedPeriode === 'Bulanan') {
      const namaBulanStr = listBulanOpsi[parseInt(selectedBulan) - 1].nama;
      const suffixName = `${namaBulanStr}_${selectedTahun}`;

      if (tipeTarget === 'guru' || tipeTarget === 'semua') {
        const sheetGuru = generateMatriksBulananSpesifik(listGuru, currentLogKehadiran, false, selectedBulan, selectedTahun);
        XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(sheetGuru), "Guru & Staf");
      }
      if (tipeTarget === 'kelas' || tipeTarget === 'semua') {
        daftarKelasUnik.forEach(namaKelas => {
          const siswaDiKelas = siswaAktifTP.filter(s => s.kelasPerTP[tahunPelajaranAktif] === namaKelas);
          const sheetSiswa = generateMatriksBulananSpesifik(siswaDiKelas, currentLogKehadiran, true, selectedBulan, selectedTahun);
          const safeName = namaKelas.replace(/[\/\\\?*\[\]]/g, "_").substring(0, 31);
          XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(sheetSiswa), safeName);
        });
      }
      XLSX.writeFile(wb, `Rekap_Bulanan_${suffixName}.xlsx`);

    } else {
      const jumlahBulan = selectedPeriode === 'Triwulan' ? 3 : selectedPeriode === 'Semester' ? 6 : 12;
      
      if (tipeTarget === 'guru' || tipeTarget === 'semua') {
        const sheetGuru = generateMatriksAkumulasiPeriode(listGuru, currentLogKehadiran, false, jumlahBulan);
        XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(sheetGuru), "Guru & Staf");
      }
      if (tipeTarget === 'kelas' || tipeTarget === 'semua') {
        daftarKelasUnik.forEach(namaKelas => {
          const siswaDiKelas = siswaAktifTP.filter(s => s.kelasPerTP[tahunPelajaranAktif] === namaKelas);
          const sheetSiswa = generateMatriksAkumulasiPeriode(siswaDiKelas, currentLogKehadiran, true, jumlahBulan);
          const safeName = namaKelas.replace(/[\/\\\?*\[\]]/g, "_").substring(0, 31);
          XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(sheetSiswa), safeName);
        });
      }
      XLSX.writeFile(wb, `Rekap_${selectedPeriode}_Akumulasi_${tahunPelajaranAktif.replace('/', '-')}.xlsx`);
    }
  };

  // EXPORT HARI INI
  const exportToSingleExcel = (dataToExport, fileName) => {
    if (typeof XLSX === 'undefined') { alert('Library XLSX belum dimuat!'); return; }
    
    const now = new Date();
    const hariIni = now.getDate().toString();
    const bulanIni = now.toLocaleDateString('id-ID', { month: 'short' }).toLowerCase();
    const bulanPanjang = now.toLocaleDateString('id-ID', { month: 'long' }).toLowerCase();
    const tahunIni = now.getFullYear().toString();

    const dataHariIniSaja = dataToExport.filter(item => {
      if (!item.tanggal) return false;
      const tglLower = item.tanggal.toLowerCase();
      const matchHari = tglLower.includes(hariIni);
      const matchBulan = tglLower.includes(bulanIni) || tglLower.includes(bulanPanjang);
      const matchTahun = tglLower.includes(tahunIni);
      return matchHari && (matchBulan || matchTahun);
    });

    if (dataHariIniSaja.length === 0) { 
      alert('Tidak ada data kehadiran untuk hari ini yang cocok!'); 
      return; 
    }

    const wb = XLSX.utils.book_new();
    const formattedData = dataHariIniSaja.map((item, index) => ({
      No: index + 1,
      Tanggal: item.tanggal,
      Nama: item.nama,
      'Jabatan/Kelas': item.jabatan_kelas,
      Peran: item.role || 'siswa',
      'Waktu Datang': item.waktuDatang,
      'Waktu Pulang': item.waktuPulang || '-',
      Status: item.status
    }));

    const ws = XLSX.utils.json_to_sheet(formattedData);
    XLSX.utils.book_append_sheet(wb, ws, "Rekapitulasi Hari Ini");
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };

  const handleDeleteArsip = (arsipId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus arsip tanggal ini? Data yang dihapus tidak dapat dikembalikan.')) {
      setArsipAbsensi(arsipAbsensi.filter(a => a.id !== arsipId));
    }
  };

  const filteredArsip = arsipAbsensi.filter(a => 
    a.tahunPelajaran === tahunPelajaranAktif &&
    a.tanggalArsip.toLowerCase().includes(searchArsip.toLowerCase())
  );

  const handlePrintRapor = () => {
    window.print();
  };

  const targetSiswa = dataSiswa.find(s => s.id.toString() === selectedSiswaId.toString());
  const riwayatSiswaLog = targetSiswa ? currentLogKehadiran.filter(l => l.nama.toLowerCase() === targetSiswa.nama.toLowerCase()) : [];
  const pelanggaranSiswaList = targetSiswa ? currentPelanggaran.filter(p => p.namaSiswa.toLowerCase() === targetSiswa.nama.toLowerCase()) : [];
  const totalPoinSiswa = pelanggaranSiswaList.reduce((acc, curr) => acc + curr.poin, 0);

  const totalHadir = riwayatSiswaLog.filter(l => l.status === 'Tepat Waktu' || l.status === 'Hadir').length;
  const totalTerlambat = riwayatSiswaLog.filter(l => l.status === 'Terlambat').length;
  const totalIzin = riwayatSiswaLog.filter(l => l.status === 'Izin').length;
  const totalSakit = riwayatSiswaLog.filter(l => l.status === 'Sakit').length;
  const totalAlpa = riwayatSiswaLog.filter(l => l.status === 'Alpa').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body * { visibility: hidden; }
          #printable-rapor, #printable-rapor * { visibility: visible; }
          #printable-rapor {
            position: absolute; left: 0; top: 0; width: 100%;
            background: white !important; box-shadow: none !important;
            padding: 20px; margin: 0; color: black !important;
          }
          .no-print { display: none !important; }
        }
      `}} />

      {/* HEADER ATAS */}
      <div className={`${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-gray-100 text-gray-800'} p-6 rounded-xl shadow-sm border flex flex-col md:flex-row justify-between items-center gap-4 no-print`}>
        <div>
          <h3 className="text-xl font-bold">Laporan Rekapitulasi & Rapor Absensi ({tahunPelajaranAktif})</h3>
          <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Unduh rekapitulasi kehadiran berdasarkan periode waktu, guru/staff, maupun kelas.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button onClick={() => exportToSingleExcel(currentLogKehadiran, `Rekap_Hari_Ini_TP_${tahunPelajaranAktif.replace('/', '-')}`)} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 shadow transition cursor-pointer">
            <Download size={16} /> Export Hari Ini
          </button>
        </div>
      </div>

      {/* PUSAT EXPORT BERKALA */}
      <div className={`${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-gray-100 text-gray-800'} p-6 rounded-xl shadow-sm border space-y-4 no-print`}>
        <div className={`flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b pb-4 ${isDarkMode ? 'border-slate-800' : ''}`}>
          <div>
            <h4 className="font-bold flex items-center gap-2">
              <Download className="text-blue-600" /> Pusat Export Rekapitulasi Berkala & Massal
            </h4>
            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'} mt-0.5`}>Pilih jenis periode laporan dan atur bulan/tahun spesifik untuk format Excel (.xlsx) multi-sheet.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div>
              <label className={`block text-[10px] font-bold ${isDarkMode ? 'text-slate-400' : 'text-gray-500'} uppercase tracking-wider mb-1`}>Jenis Periode</label>
              <select 
                value={selectedPeriode} 
                onChange={(e) => setSelectedPeriode(e.target.value)} 
                className={`border p-2 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-blue-400' : 'bg-blue-50 border-gray-200 text-blue-700'}`}
              >
                <option value="Bulanan" className="bg-slate-900 text-white">Bulanan (Pilih Bulan)</option>
                <option value="Triwulan" className="bg-slate-900 text-white">Triwulan (3 Bulan Terakhir)</option>
                <option value="Semester" className="bg-slate-900 text-white">Semester (6 Bulan Terakhir)</option>
                <option value="Tahunan" className="bg-slate-900 text-white">Tahunan (12 Bulan Terakhir)</option>
              </select>
            </div>

            {selectedPeriode === 'Bulanan' && (
              <>
                <div>
                  <label className={`block text-[10px] font-bold ${isDarkMode ? 'text-slate-400' : 'text-gray-500'} uppercase tracking-wider mb-1`}>Pilih Bulan</label>
                  <select 
                    value={selectedBulan} 
                    onChange={(e) => setSelectedBulan(e.target.value)} 
                    className={`border p-2 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-emerald-400' : 'bg-emerald-50 border-gray-200 text-emerald-700'}`}
                  >
                    {listBulanOpsi.map(b => <option key={b.id} value={b.id} className="bg-slate-900 text-white">{b.nama}</option>)}
                  </select>
                </div>

                <div>
                  <label className={`block text-[10px] font-bold ${isDarkMode ? 'text-slate-400' : 'text-gray-500'} uppercase tracking-wider mb-1`}>Tahun</label>
                  <select 
                    value={selectedTahun} 
                    onChange={(e) => setSelectedTahun(e.target.value)} 
                    className={`border p-2 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-yellow-400' : 'bg-yellow-50 border-gray-200 text-yellow-700'}`}
                  >
                    {(() => {
                      const tahunMatch = tahunPelajaranAktif ? tahunPelajaranAktif.match(/\d{4}/g) : null;
                      const daftarTahunTP = tahunMatch ? [...new Set(tahunMatch)] : [new Date().getFullYear().toString()];
                      
                      const tahunSekarang = new Date().getFullYear().toString();
                      if (!daftarTahunTP.includes(tahunSekarang)) daftarTahunTP.push(tahunSekarang);

                      return daftarTahunTP.sort().map(thn => (
                        <option key={thn} value={thn} className="bg-slate-900 text-white">
                          {thn}
                        </option>
                      ));
                    })()}
                  </select>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className={`p-4 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border'} rounded-2xl flex flex-col justify-between space-y-3`}>
            <div>
              <span className="text-xs font-bold px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded-md border border-blue-500/30">Guru & Staff</span>
              <h5 className="font-bold mt-2">Rekapitulasi Guru & Staf</h5>
              <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'} mt-0.5`}>Unduh data kehadiran khusus pendidik dan tenaga kependidikan.</p>
            </div>
            <button 
              onClick={() => handleExportBerkala('guru')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl text-xs font-medium flex items-center justify-center gap-2 shadow transition cursor-pointer"
            >
              <Download size={14} /> Export Rekap Guru ({selectedPeriode})
            </button>
          </div>

          <div className={`p-4 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border'} rounded-2xl flex flex-col justify-between space-y-3`}>
            <div>
              <span className="text-xs font-bold px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded-md border border-purple-500/30">Siswa Per Kelas</span>
              <h5 className="font-bold mt-2">Rekap Siswa (Multi-Sheet Kelas)</h5>
              <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'} mt-0.5`}>Unduh rekap presensi seluruh siswa dengan tab terpisah per kelas.</p>
            </div>
            <button 
              onClick={() => handleExportBerkala('kelas')}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-xl text-xs font-medium flex items-center justify-center gap-2 shadow transition cursor-pointer"
            >
              <Download size={14} /> Export Kelas ({selectedPeriode})
            </button>
          </div>

          <div className={`p-4 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border'} rounded-2xl flex flex-col justify-between space-y-3`}>
            <div>
              <span className="text-xs font-bold px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-md border border-emerald-500/30">Seluruh Sekolah</span>
              <h5 className="font-bold mt-2">Rekap Lengkap (Guru & Siswa)</h5>
              <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'} mt-0.5`}>Unduh file Excel lengkap dengan tab guru dan seluruh kelas siswa.</p>
            </div>
            <button 
              onClick={() => handleExportBerkala('semua')}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-xl text-xs font-medium flex items-center justify-center gap-2 shadow transition cursor-pointer"
            >
              <Download size={14} /> Export Semua Sekolah ({selectedPeriode})
            </button>
          </div>
        </div>
      </div>

      {/* CETAK RAPOR ABSENSI INDIVIDUAL SISWA */}
      <div className={`${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-gray-100 text-gray-800'} p-6 rounded-xl shadow-sm border space-y-4 no-print`}>
        <h4 className="font-bold flex items-center gap-2">
          <FileText className="text-blue-600" /> Cetak Rapor Absensi Individual Siswa
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label className={`block text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-gray-500'} uppercase tracking-wider mb-1`}>Filter Kelas</label>
            <select 
              value={selectedKelas} 
              onChange={(e) => handleKelasChange(e.target.value)} 
              className={`w-full border p-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-gray-200'}`}
            >
              {daftarKelas.map(k => <option key={k} value={k} className="bg-slate-900 text-white">Kelas: {k}</option>)}
            </select>
          </div>
          <div>
            <label className={`block text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-gray-500'} uppercase tracking-wider mb-1`}>Pilih Siswa</label>
            <select 
              value={selectedSiswaId} 
              onChange={(e) => setSelectedSiswaId(e.target.value)} 
              className={`w-full border p-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-gray-200'}`}
            >
              {siswaFiltered.length > 0 ? (
                siswaFiltered.map(s => <option key={s.id} value={s.id} className="bg-slate-900 text-white">{s.nama}</option>)
              ) : (
                <option value="">Tidak ada siswa di kelas ini</option>
              )}
            </select>
          </div>
          <div>
            <button 
              onClick={() => {
                if (!targetSiswa) { alert('Silakan pilih siswa terlebih dahulu!'); return; }
                setShowRaporModal(true);
              }} 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-xl font-medium flex items-center justify-center gap-2 shadow transition cursor-pointer text-sm"
            >
              <Eye size={18} /> Lihat Rapor Siswa
            </button>
          </div>
        </div>
      </div>

      {/* MODAL PRATINJAU RAPOR SISWA */}
      {showRaporModal && targetSiswa && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className={`${isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white text-gray-800'} w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]`}>
            <div className="bg-blue-600 p-4 text-white flex justify-between items-center no-print">
              <h3 className="font-bold text-base">Pratinjau Rapor Absensi: {targetSiswa.nama}</h3>
              <div className="flex items-center gap-2">
                <button onClick={handlePrintRapor} className="bg-white text-blue-700 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 hover:bg-blue-50 transition cursor-pointer">
                  <Printer size={14} /> Cetak
                </button>
                <button onClick={() => setShowRaporModal(false)} className="text-white/80 hover:text-white p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition cursor-pointer"><X size={18}/></button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto flex-1 bg-gray-50 flex justify-center">
              <div id="printable-rapor" className="bg-white text-gray-800 w-[650px] p-8 shadow-sm rounded-xl space-y-5 border">
                <div className="flex items-center gap-4 border-b-2 border-gray-800 pb-3">
                  <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center text-white overflow-hidden flex-shrink-0">
                    {targetSiswa.foto ? <img src={targetSiswa.foto} alt="Foto Siswa" className="w-full h-full object-cover" /> : infoSekolah.logo ? <img src={infoSekolah.logo} alt="Logo" className="w-full h-full object-cover" /> : <School size={32} />}
                  </div>
                  <div className="text-center flex-1">
                    <h3 className="font-black text-lg uppercase tracking-wider">{infoSekolah.nama}</h3>
                    <p className="text-[11px] text-gray-600">LAPORAN REKAPITULASI KEHADIRAN & KEDISIPLINAN SISWA</p>
                    <p className="text-[9px] text-gray-500">Tahun Pelajaran {tahunPelajaranAktif} &bull; Periode: {selectedPeriode}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded-xl text-xs border">
                  <div>
                    <span className="text-gray-500">Nama Siswa:</span>
                    <p className="font-bold text-sm">{targetSiswa.nama}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Kelas / Jurusan:</span>
                    <p className="font-bold text-sm">{targetSiswa.kelasPerTP[tahunPelajaranAktif]}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Nomor Induk RFID:</span>
                    <p className="font-mono font-bold">{targetSiswa.rfid}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Status Kedisiplinan:</span>
                    <p className={`font-bold ${totalPoinSiswa >= 50 ? 'text-red-600' : totalPoinSiswa >= 25 ? 'text-yellow-600' : 'text-green-600'}`}>
                      {totalPoinSiswa} Poin ({totalPoinSiswa >= 50 ? 'Bahaya / SP' : totalPoinSiswa >= 25 ? 'Peringatan' : 'Aman'})
                    </p>
                  </div>
                </div>

                <div>
                  <h5 className="font-bold text-xs mb-2 text-gray-700 uppercase tracking-wider">1. Ringkasan Kehadiran</h5>
                  <div className="grid grid-cols-5 gap-2 text-center">
                    <div className="p-2 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-[9px] text-green-700 font-bold uppercase">Hadir / Tepat</p>
                      <p className="text-lg font-black text-green-800">{totalHadir}</p>
                    </div>
                    <div className="p-2 bg-orange-50 border border-orange-200 rounded-lg">
                      <p className="text-[9px] text-orange-700 font-bold uppercase">Telat</p>
                      <p className="text-lg font-black text-orange-800">{totalTerlambat}</p>
                    </div>
                    <div className="p-2 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-[9px] text-blue-700 font-bold uppercase">Izin</p>
                      <p className="text-lg font-black text-blue-800">{totalIzin}</p>
                    </div>
                    <div className="p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-[9px] text-yellow-700 font-bold uppercase">Sakit</p>
                      <p className="text-lg font-black text-yellow-800">{totalSakit}</p>
                    </div>
                    <div className="p-2 bg-rose-50 border border-rose-200 rounded-lg">
                      <p className="text-[9px] text-rose-700 font-bold uppercase">Alpa</p>
                      <p className="text-lg font-black text-rose-800">{totalAlpa}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="font-bold text-xs mb-2 text-gray-700 uppercase tracking-wider">2. Catatan Pelanggaran & Poin Disiplin</h5>
                  {pelanggaranSiswaList.length > 0 ? (
                    <table className="w-full text-left border text-xs">
                      <thead>
                        <tr className="bg-gray-100 border-b">
                          <th className="p-2">Tanggal</th>
                          <th className="p-2">Jenis Pelanggaran</th>
                          <th className="p-2 text-right">Poin</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pelanggaranSiswaList.map(p => (
                          <tr key={p.id} className="border-b">
                            <td className="p-2">{p.tanggal}</td>
                            <td className="p-2">{p.jenisPelanggaran}</td>
                            <td className="p-2 text-right font-bold text-red-600">+{p.poin}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-[11px] text-gray-500 italic p-2 bg-gray-50 border rounded-lg text-center">Tidak ada catatan pelanggaran disiplin pada periode ini.</p>
                  )}
                </div>

                <div>
                  <p className="text-xs text-gray-600 leading-relaxed">Demikian laporan rekapitulasi absensi dan catatan kedisiplinan ini diterbitkan agar dapat diperhatikan oleh orang tua/wali murid serta pihak sekolah.</p>
                </div>

                <div className="pt-6 flex justify-between text-[11px] text-center">
                  <div>
                    <p>Mengetahui,</p>
                    <p className="font-bold">Orang Tua / Wali Murid</p>
                    <div className="h-12"></div>
                    <p className="border-t border-gray-400 inline-block px-6 pt-1">( . . . . . . . . . . . . . . . . . . )</p>
                  </div>
                  <div>
                    <p>{new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    <p className="font-bold">Wali Kelas / Guru Piket</p>
                    <div className="h-12"></div>
                    <p className="border-t border-gray-400 inline-block px-6 pt-1">Administrator / Piket</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`p-4 border-t ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-gray-50'} flex justify-end no-print`}>
              <button onClick={() => setShowRaporModal(false)} className="px-5 py-2 bg-gray-800 text-white rounded-xl text-sm font-medium cursor-pointer">Tutup</button>
            </div>
          </div>
        </div>
      )}

      {/* RIWAYAT ARSIP TUTUP BUKU */}
      {arsipAbsensi.length > 0 && (
        <div className={`${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-gray-100 text-gray-800'} p-6 rounded-xl shadow-sm border space-y-4 no-print`}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h4 className="font-bold flex items-center gap-2">
              <Archive className="text-orange-500" /> Riwayat Arsip Tutup Buku ({tahunPelajaranAktif})
            </h4>
            <div className="w-full md:w-72">
              <input 
                type="text"
                value={searchArsip}
                onChange={(e) => setSearchArsip(e.target.value)}
                className={`w-full border px-3 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-gray-50 border-gray-200'}`}
                placeholder="Cari berdasarkan tanggal arsip..."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredArsip.length > 0 ? (
              filteredArsip.map(arsip => (
                <div key={arsip.id} className={`p-4 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border'} rounded-xl flex justify-between items-center`}>
                  <div>
                    <p className="font-bold text-sm">{arsip.tanggalArsip}</p>
                    <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>{arsip.totalLog} Data Tercatat</p>
                  </div>
                  <div className="flex gap-1.5">
                    <button onClick={() => setViewingArsip(arsip)} className={`p-2 ${isDarkMode ? 'bg-blue-950 text-blue-300 hover:bg-blue-900' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'} rounded-lg transition cursor-pointer`} title="Lihat Arsip">
                      <Eye size={16} />
                    </button>
                    <button onClick={() => exportToSingleExcel(arsip.data, `Arsip_${arsip.tanggalArsip}`)} className={`p-2 ${isDarkMode ? 'bg-green-950 text-green-300 hover:bg-green-900' : 'bg-green-50 text-green-600 hover:bg-green-100'} rounded-lg transition cursor-pointer`} title="Download Excel">
                      <Download size={16} />
                    </button>
                    <button onClick={() => handleDeleteArsip(arsip.id)} className={`p-2 ${isDarkMode ? 'bg-red-950 text-red-300 hover:bg-red-900' : 'bg-red-50 text-red-600 hover:bg-red-100'} rounded-lg transition cursor-pointer`} title="Hapus Arsip">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-3 text-center py-6 text-gray-400 text-xs italic">Tidak ada arsip untuk tahun pelajaran {tahunPelajaranAktif}.</p>
            )}
          </div>
        </div>
      )}

      {/* MODAL LIHAT ARSIP */}
      {viewingArsip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className={`${isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white text-gray-800'} w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]`}>
            <div className="bg-orange-600 p-6 text-white flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">Arsip Tanggal: {viewingArsip.tanggalArsip}</h3>
                <p className="text-xs text-orange-100">Total Kehadiran Tercatat: {viewingArsip.totalLog} warga sekolah</p>
              </div>
              <button onClick={() => setViewingArsip(null)} className="text-white/80 hover:text-white p-2 rounded-lg bg-white/10 hover:bg-white/20 transition cursor-pointer"><X size={20}/></button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className={`${isDarkMode ? 'bg-slate-800 text-slate-400 border-slate-700' : 'bg-gray-50 text-gray-500 border-b'} text-xs uppercase`}><th className="px-4 py-3">No</th><th className="px-4 py-3">Nama</th><th className="px-4 py-3">Kelas/Jabatan</th><th className="px-4 py-3">Datang</th><th className="px-4 py-3">Status</th></tr>
                </thead>
                <tbody className={`divide-y ${isDarkMode ? 'divide-slate-800' : 'divide-gray-100'} text-sm`}>
                  {viewingArsip.data.map((item, idx) => (
                    <tr key={item.id} className={`${isDarkMode ? 'hover:bg-slate-800/50' : 'hover:bg-gray-50'}`}>
                      <td className="px-4 py-3">{idx + 1}</td>
                      <td className="px-4 py-3 font-bold">{item.nama}</td>
                      <td className="px-4 py-3">{item.jabatan_kelas}</td>
                      <td className="px-4 py-3 text-green-500">{item.waktuDatang}</td>
                      <td className="px-4 py-3"><span className="px-2 py-0.5 rounded text-xs font-bold bg-green-500/10 text-green-400 border border-green-500/30">{item.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className={`p-4 border-t ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-gray-50'} flex justify-end`}>
              <button onClick={() => setViewingArsip(null)} className="px-5 py-2 bg-gray-800 text-white rounded-xl text-sm font-medium cursor-pointer">Tutup</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ==============================================================
   14. KOMPONEN MASTER DATA (DENGAN HAPUS MASAL, IMPORT, TEMPLATE CSV)
============================================================== */
const KontenMasterData = ({ dataGuru, setDataGuru, dataSiswa, setDataSiswa, logKehadiran, isDarkMode, tahunPelajaranAktif, daftarTahunPelajaran }) => {
  const [activeTab, setActiveTab] = useState('siswa');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [daftarMasterKelas, setDaftarMasterKelas] = useState(() => {
    const saved = localStorage.getItem('daftarMasterKelas');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('daftarMasterKelas', JSON.stringify(daftarMasterKelas));
  }, [daftarMasterKelas]);

  const [isKelasModalOpen, setIsKelasModalOpen] = useState(false);
  const [inputNamaKelas, setInputNamaKelas] = useState('');
  const [inputKeahlian, setInputKeahlian] = useState('');

  const daftarNamaKelasFilter = ['Semua', ...new Set(daftarMasterKelas.map(k => k.nama.trim().toUpperCase()))];
  const [selectedKelasFilter, setSelectedKelasFilter] = useState('Semua');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); 
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({ 
    nama: '', 
    nisn: '', 
    kodeGuru: '',
    jabatan_kelas: '', 
    rfid: '', 
    foto: ''
  });
  
  const [selectedPersonHistory, setSelectedPersonHistory] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    setSelectedIds([]);
  }, [activeTab, selectedKelasFilter, searchQuery]);

  const getInitials = (fullName) => {
    if (!fullName) return 'US';
    const cleanName = fullName.split(',')[0].trim();
    const parts = cleanName.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].substring(0, 2).toUpperCase();
  };

  const getAvatarUrl = (name) => {
    const initials = getInitials(name);
    return `https://ui-avatars.com/api/?name=${initials}&background=2563eb&color=fff&size=128&bold=true`;
  };

  const processAndSetPhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Harap unggah file gambar (JPG/PNG).');
      e.target.value = null;
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 300; 
        const MAX_HEIGHT = 400; 
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
        setFormData(prev => ({ ...prev, foto: compressedDataUrl }));
      };
    };
    reader.readAsDataURL(file);
  };

  const handleOpenAdd = () => {
    setModalMode('add');
    const defaultName = activeTab === 'guru' ? 'Guru Baru' : 'Siswa Baru';
    const defaultKelas = daftarMasterKelas[0]?.nama || '';
    setFormData({ 
      nama: '', 
      nisn: '',
      kodeGuru: activeTab === 'guru' ? `GURU-${Date.now().toString().slice(-4)}` : '',
      jabatan_kelas: activeTab === 'guru' ? 'Guru Mata Pelajaran' : defaultKelas, 
      rfid: '', 
      foto: getAvatarUrl(defaultName)
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (data) => {
    setModalMode('edit');
    setEditingId(data.id);
    const kelasCurrent = activeTab === 'siswa' ? (data.kelasPerTP?.[tahunPelajaranAktif] || daftarMasterKelas[0]?.nama || '') : data.jabatan_kelas;
    const fallbackAvatar = getAvatarUrl(data.nama);
    setFormData({ 
      nama: data.nama, 
      nisn: data.nisn || '',
      kodeGuru: data.kodeGuru || '',
      jabatan_kelas: kelasCurrent, 
      rfid: data.rfid, 
      foto: (data.foto && data.foto.startsWith('data:image')) ? data.foto : fallbackAvatar
    });
    setIsModalOpen(true);
  };

  // FUNGSI HAPUS DENGAN SUPABASE
  const handleDelete = async (id) => {
    if (window.confirm('Hapus data ini?')) {
      const targetTable = activeTab === 'guru' ? 'guru' : 'siswa';
      const { error } = await supabase.from(targetTable).delete().eq('id', id);

      if (error) {
        alert('Gagal menghapus data dari Supabase: ' + error.message);
        return;
      }

      if (activeTab === 'guru') setDataGuru(dataGuru.filter(item => item.id !== id));
      else setDataSiswa(dataSiswa.filter(item => item.id !== id));
      setSelectedIds(selectedIds.filter(itemId => itemId !== id));
    }
  };

  // FUNGSI HAPUS MASAL DENGAN SUPABASE
  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (window.confirm(`Apakah Anda yakin ingin menghapus ${selectedIds.length} data yang dipilih?`)) {
      const targetTable = activeTab === 'guru' ? 'guru' : 'siswa';
      const { error } = await supabase.from(targetTable).delete().in('id', selectedIds);

      if (error) {
        alert('Gagal menghapus data massal dari Supabase: ' + error.message);
        return;
      }

      if (activeTab === 'guru') {
        setDataGuru(dataGuru.filter(item => !selectedIds.includes(item.id)));
      } else {
        setDataSiswa(dataSiswa.filter(item => !selectedIds.includes(item.id)));
      }
      setSelectedIds([]);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = filteredData.map(item => item.id);
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  };

  const handleCheckboxChange = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(itemId => itemId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleAddKelasMaster = (e) => {
    e.preventDefault();
    const cleanKelas = inputNamaKelas.trim().toUpperCase();
    const cleanKeahlian = inputKeahlian.trim();
    if (!cleanKelas || !cleanKeahlian) return;

    if (daftarMasterKelas.some(k => k.nama.trim().toUpperCase() === cleanKelas)) {
      alert(`Kelas "${cleanKelas}" sudah ada dalam daftar master kelas.`);
      return;
    }

    setDaftarMasterKelas([...daftarMasterKelas, { nama: cleanKelas, keahlian: cleanKeahlian }]);
    setInputNamaKelas('');
    setInputKeahlian('');
    alert(`Kelas "${cleanKelas}" dengan keahlian "${cleanKeahlian}" berhasil ditambahkan!`);
  };

  const handleDeleteKelasMaster = (namaKelasTarget) => {
    if (window.confirm(`Hapus kelas "${namaKelasTarget}" dari daftar master kelas?`)) {
      setDaftarMasterKelas(daftarMasterKelas.filter(k => k.nama !== namaKelasTarget));
      if (selectedKelasFilter === namaKelasTarget) setSelectedKelasFilter('Semua');
    }
  };

  // FUNGSI SIMPAN DATA KE SUPABASE (ADD & EDIT)
  const handleSaveData = async (e) => {
    e.preventDefault();
    const defaultAvatar = getAvatarUrl(formData.nama);
    const finalFoto = (formData.foto && formData.foto.startsWith('data:image')) ? formData.foto : defaultAvatar;

    const cleanRfidInput = formData.rfid ? formData.rfid.trim().toUpperCase() : '';
    
    if (activeTab === 'guru') {
      const finalKodeGuru = formData.kodeGuru ? formData.kodeGuru.trim() : `GURU-${Date.now().toString().slice(-4)}`;
      const finalRfid = cleanRfidInput && cleanRfidInput !== 'RFID' ? cleanRfidInput : `KODE-${finalKodeGuru}`;

      if (modalMode === 'add') {
        const newData = { nama: formData.nama, kodeGuru: finalKodeGuru, jabatan_kelas: formData.jabatan_kelas, rfid: finalRfid, foto: finalFoto };
        const { data, error } = await supabase.from('guru').insert([newData]).select();
        
        if (error) {
          alert('Gagal menyimpan ke Supabase: ' + error.message);
          return;
        }
        if (data && data.length > 0) {
          setDataGuru([data[0], ...dataGuru]);
        }
      } else {
        const updatedData = { nama: formData.nama, kodeGuru: finalKodeGuru, jabatan_kelas: formData.jabatan_kelas, rfid: finalRfid, foto: finalFoto };
        const { error } = await supabase.from('guru').update(updatedData).eq('id', editingId);
        
        if (error) {
          alert('Gagal memperbarui di Supabase: ' + error.message);
          return;
        }
        setDataGuru(dataGuru.map(item => item.id === editingId ? { ...item, ...updatedData } : item));
      }
    } else {
      const finalRfid = cleanRfidInput && cleanRfidInput !== 'RFID' ? cleanRfidInput : (formData.nisn ? `NISN-${formData.nisn.trim()}` : `ID-${Date.now()}`);
      const cleanKelasForm = formData.jabatan_kelas.trim().toUpperCase();
      
      if (modalMode === 'add') {
        const initialKelasPerTP = { [tahunPelajaranAktif]: cleanKelasForm };
        const initialStatusTP = { [tahunPelajaranAktif]: 'Aktif' };

        const newSiswa = {
          nama: formData.nama,
          nisn: formData.nisn ? formData.nisn.trim() : '',
          rfid: finalRfid,
          foto: finalFoto,
          kelasPerTP: initialKelasPerTP,
          statusTP: initialStatusTP
        };

        const { data, error } = await supabase.from('siswa').insert([newSiswa]).select();
        if (error) {
          alert('Gagal menyimpan ke Supabase: ' + error.message);
          return;
        }
        if (data && data.length > 0) {
          setDataSiswa([data[0], ...dataSiswa]);
        }
      } else {
        const targetSiswa = dataSiswa.find(item => item.id === editingId);
        const updatedKelasPerTP = { ...(targetSiswa?.kelasPerTP || {}) };
        updatedKelasPerTP[tahunPelajaranAktif] = cleanKelasForm;
        const updatedStatusTP = { ...(targetSiswa?.statusTP || {}) };
        if (!updatedStatusTP[tahunPelajaranAktif]) updatedStatusTP[tahunPelajaranAktif] = 'Aktif';

        const updatedData = {
          nama: formData.nama,
          nisn: formData.nisn ? formData.nisn.trim() : '',
          rfid: finalRfid,
          foto: finalFoto,
          kelasPerTP: updatedKelasPerTP,
          statusTP: updatedStatusTP
        };

        const { error } = await supabase
          .from('siswa')
          .update(updatedData)
          .eq('id', editingId);

        if (error) {
          alert('Gagal memperbarui data: ' + error.message);
          return;
        }
        
        // Refresh state lokal agar tabel langsung terupdate
        setDataSiswa(dataSiswa.map(item => item.id === editingId ? { ...item, ...updatedData } : item));
      }
    }
    setIsModalOpen(false);
  };

  const handleDownloadTemplate = () => {
    let csvHeader = activeTab === 'siswa' 
      ? "Nama,NISN,Kelas,Konsentrasi Keahlian,RFID\nBudi Santoso,0081234567,X TITL,Teknik Ketenagalistrikan,SSW101\nCitra Kirana,0087654321,X TKRO,Teknik Kendaraan Ringan Otomotif,SSW102"
      : "Nama,Kode Guru,Jabatan,RFID\n\"ADE SUHARSONO, S.Pd.\",GURU001,KEPALA SEKOLAH,SW001\n\"R. BAROTO PRISWANTO, S.Pd.I.\",GURU002,WAKIL KEPALA SEKOLAH,SW002\nSujana S.Pd.,GURU014,GURU,SW014";
    
    const blob = new Blob([csvHeader], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Template_Import_${activeTab === 'siswa' ? 'Siswa' : 'Guru'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      let text = event.target.result;
      text = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
      const lines = text.split('\n').map(l => l.trim()).filter(l => l);
      
      if (lines.length <= 1) {
        alert('File CSV kosong atau tidak memiliki data baris!');
        return;
      }

      const delimiter = lines[0].includes(';') ? ';' : ',';

      let importedCount = 0;
      if (activeTab === 'siswa') {
        const newMasterClasses = [...daftarMasterKelas];
        const batchSiswaToInsert = [];

        for (let i = 1; i < lines.length; i++) {
          const cols = lines[i].split(delimiter).map(c => c.trim().replace(/^"|"$/g, ''));
          
          // Lewati jika baris benar-benar kosong total
          if (cols.length === 0 || !cols[0]) continue;

          // Lewati jika baris adalah header (mengandung kata 'nama' atau 'nisn')
          const firstColLower = cols[0].toLowerCase();
          if (firstColLower === 'nama' || firstColLower.includes('nisn')) continue;

          const nama = cols[0];
          const nisn = cols[1] || '';
          const kelas = (cols[2] || '').trim().toUpperCase(); // Kolom C = Kelas (X TITL)
          const keahlian = cols[3] || 'Konsentrasi Umum';
          const rfid = cols[4] || '';

          if (kelas && !newMasterClasses.some(k => k.nama.trim().toUpperCase() === kelas)) {
            newMasterClasses.push({ nama: kelas, keahlian: keahlian });
          }

          const autoFoto = typeof getAvatarUrl === 'function' ? getAvatarUrl(nama) : `https://ui-avatars.com/api/?name=${encodeURIComponent(nama)}`;
          const generatedRfid = (rfid && rfid !== 'RFID' && rfid !== '') ? rfid.toUpperCase() : (nisn ? `NISN-${nisn}` : `ID-${Date.now() + i}`);

         batchSiswaToInsert.push({
            nama,
            nisn,
            rfid: generatedRfid,
            foto: autoFoto,
            kelasPerTP: {
              [tahunPelajaranAktif]: kelas
            },
            statusTP: {
              [tahunPelajaranAktif]: 'Aktif'
            }
          });
        }

        // Bulk insert supaya prosesnya kilat dan langsung masuk Supabase
       if (batchSiswaToInsert.length > 0) {
          const { data, error } = await supabase.from('siswa').insert(batchSiswaToInsert).select();
          if (error) {
            alert('Gagal import massal ke Supabase: ' + error.message);
            return;
          }
          if (data) {
            // Gabungkan data dari Supabase langsung ke state lokal tabel aplikasi
            setDataSiswa(prevSiswa => [...data, ...prevSiswa]);
            setDaftarMasterKelas(newMasterClasses);
            alert(`Berhasil mengimpor ${data.length} data siswa secara massal!`);
          }
        }
      } else {
        const newGuruList = [...dataGuru];
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i];
          if (!line) continue;

          let cols = [];
          let currentVal = '';
          let inQuotes = false;

          for (let charIdx = 0; charIdx < line.length; charIdx++) {
            const char = line[charIdx];
            if (char === '"') {
              inQuotes = !inQuotes;
            } else if (char === delimiter && !inQuotes) {
              cols.push(currentVal.trim().replace(/^"|"$/g, ''));
              currentVal = '';
            } else {
              currentVal += char;
            }
          }
          cols.push(currentVal.trim().replace(/^"|"$/g, ''));

          if (cols.length >= 4) {
            const [nama, kodeGuru, jabatan, rfid] = cols;
            const autoFoto = typeof getAvatarUrl === 'function' ? getAvatarUrl(nama || 'Guru') : `https://ui-avatars.com/api/?name=Guru`;
            const finalKodeGuru = kodeGuru || `GURU-${Date.now()}`;
            const finalRfid = (rfid && rfid !== 'RFID') ? rfid.toUpperCase() : `KODE-${finalKodeGuru}`;

            const payloadGuru = {
              nama: nama || 'Tanpa Nama',
              kodeGuru: finalKodeGuru,
              jabatan_kelas: jabatan || 'Guru',
              rfid: finalRfid,
              foto: autoFoto
            };

            const { data } = await supabase.from('guru').insert([payloadGuru]).select();
            if (data && data.length > 0) {
              newGuruList.unshift(data[0]);
            }
            importedCount++;
          }
        }
        setDataGuru(newGuruList);
      }

      e.target.value = null;
    };
    reader.readAsText(file);
  };

  const currentData = activeTab === 'guru' 
    ? dataGuru 
    : dataSiswa.map(s => {
        // Amankan kelasPerTP (ubah dari teks string ke objek JSON jika perlu)
        let kelasObj = s.kelasPerTP;
        if (typeof kelasObj === 'string') {
          try { kelasObj = JSON.parse(kelasObj); } catch (e) { kelasObj = {}; }
        }
        const kelasSiswa = (kelasObj?.[tahunPelajaranAktif] || 'Belum diatur').trim().toUpperCase();

        // Amankan statusTP
        let statusObj = s.statusTP;
        if (typeof statusObj === 'string') {
          try { statusObj = JSON.parse(statusObj); } catch (e) { statusObj = {}; }
        }
        const statusAktifTP = statusObj?.[tahunPelajaranAktif] || 'Belum Terdaftar';

        const foundMaster = daftarMasterKelas.find(k => k.nama.trim().toUpperCase() === kelasSiswa);
        
        return {
          ...s,
          jabatan_kelas: kelasSiswa,
          programKeahlian: foundMaster ? foundMaster.keahlian : 'Belum diatur',
          statusAktifTP: statusAktifTP
        };
      });
 
  const filteredData = currentData.filter(item => {
    const matchSearch = item.nama.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        item.rfid.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        (item.nisn && item.nisn.toLowerCase().includes(searchQuery.toLowerCase())) ||
                        (item.kodeGuru && item.kodeGuru.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchKelas = activeTab === 'siswa' && selectedKelasFilter !== 'Semua' ? item.jabatan_kelas.trim().toUpperCase() === selectedKelasFilter.trim().toUpperCase() : true;
    return matchSearch && matchKelas;
  }).sort((a, b) => a.nama.localeCompare(b.nama));

  const personalLogs = selectedPersonHistory 
    ? logKehadiran.filter(log => log.nama.toLowerCase() === selectedPersonHistory.nama.toLowerCase() && log.tahunPelajaran === tahunPelajaranAktif)
    : [];

  const isAllSelected = filteredData.length > 0 && filteredData.every(item => selectedIds.includes(item.id));

 return (
    <div className="flex flex-col h-full space-y-4">
      {/* BAGIAN ATAS / FILTER & TOMBOL AKSI (Diringkas agar muat di HP) */}
      <div className={`${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-gray-100 text-gray-800'} p-3 rounded-xl shadow-sm border flex flex-col gap-3`}>
        
        {/* Baris 1: Tab Pilihan (Siswa / Guru) & Tombol Tambah HP */}
        <div className="flex items-center justify-between">
          <div className={`flex ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border'} p-1 rounded-full`}>
            <button onClick={() => { setActiveTab('siswa'); setSelectedKelasFilter('Semua'); }} className={`px-5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${activeTab === 'siswa' ? `${isDarkMode ? 'bg-slate-900 text-blue-400' : 'bg-white text-blue-600'} shadow-sm` : 'opacity-60'}`}>Siswa</button>
            <button onClick={() => setActiveTab('guru')} className={`px-5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${activeTab === 'guru' ? `${isDarkMode ? 'bg-slate-900 text-blue-400' : 'bg-white text-blue-600'} shadow-sm` : 'opacity-60'}`}>Guru & Staff</button>
          </div>

          <button onClick={handleOpenAdd} className="bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center gap-1 text-xs font-semibold cursor-pointer shadow transition md:hidden"><Plus size={15} /> Tambah</button>
        </div>

        {/* Baris 2: Filter & Tombol Lainnya (Bisa digeser ke samping di HP) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {selectedIds.length > 0 && (
            <button onClick={handleBulkDelete} className="bg-red-600 text-white px-3 py-2 rounded-lg flex items-center gap-1 text-xs font-semibold cursor-pointer shadow transition flex-shrink-0">
              <Trash2 size={14} /> Hapus ({selectedIds.length})
            </button>
          )}

          {activeTab === 'siswa' && (
            <>
              <button onClick={() => setIsKelasModalOpen(true)} className={`px-3 py-2 rounded-lg border flex items-center gap-1 text-xs font-semibold transition cursor-pointer flex-shrink-0 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-blue-400' : 'bg-blue-50 border-blue-200 text-blue-600'}`}>
                <Layers size={14} /> Kelola Kelas
              </button>

              <select value={selectedKelasFilter} onChange={(e) => setSelectedKelasFilter(e.target.value)} className={`px-3 py-2 border rounded-lg text-xs flex-shrink-0 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white'}`}>
                {daftarNamaKelasFilter.map(k => <option key={k} value={k} className="bg-slate-900 text-white">Kelas: {k}</option>)}
              </select>
            </>
          )}
          
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className={`px-3 py-2 border rounded-lg text-xs min-w-[160px] flex-1 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : ''}`} placeholder="Cari nama, NISN, RFID..." />
          
          <button onClick={handleDownloadTemplate} className={`px-3 py-2 rounded-lg border flex items-center gap-1 text-xs font-semibold transition cursor-pointer flex-shrink-0 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'}`}>
            <Download size={14} /> Template
          </button>

          <label className="bg-emerald-600 text-white px-3 py-2 rounded-lg flex items-center gap-1 text-xs font-semibold cursor-pointer shadow transition flex-shrink-0">
            <Upload size={14} /> Import
            <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
          </label>

          <button onClick={handleOpenAdd} className="bg-blue-600 text-white px-3 py-2 rounded-lg hidden md:flex items-center gap-1 text-xs font-semibold cursor-pointer shadow transition flex-shrink-0"><Plus size={15} /> Tambah</button>
        </div>
      </div>

      {/* BAGIAN TABEL DATA UTAMA */}
      <div className={`${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-gray-100'} rounded-xl shadow-sm border flex-1 overflow-y-auto max-h-[calc(100vh-200px)] p-1`}>
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 z-10">
            <tr className={`${isDarkMode ? 'bg-slate-900 text-slate-300 border-slate-800' : 'bg-gray-100 text-gray-700'} border-b text-xs uppercase shadow-sm`}>
              <th className="px-3 py-3 w-10 text-center">
                <input 
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                  className="rounded cursor-pointer w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
              </th>
              <th className="px-3 py-3">No.</th>
              <th className="px-4 py-3">Foto & Nama</th>
              {activeTab === 'siswa' && <th className="px-4 py-3">NISN</th>}
              {activeTab === 'guru' && <th className="px-4 py-3">Kode Guru</th>}
              <th className="px-4 py-3">{activeTab === 'guru' ? 'Jabatan' : `Kelas & Kejuruan`}</th>
              {activeTab === 'siswa' && <th className="px-4 py-3">Status TP</th>}
              <th className="px-4 py-3">RFID / QR</th>
              <th className="px-4 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${isDarkMode ? 'divide-slate-800' : 'divide-gray-100'} text-xs md:text-sm`}>
            {filteredData.length > 0 ? (
              filteredData.map((item, idx) => {
                const isChecked = selectedIds.includes(item.id);
                const fallbackAvatar = getAvatarUrl(item.nama);
                const avatarSrc = (item.foto && (item.foto.startsWith('data:image') || item.foto.startsWith('http'))) ? item.foto : fallbackAvatar;

                return (
                  <tr key={item.id} className={`${isDarkMode ? (isChecked ? 'bg-slate-800/90' : 'hover:bg-slate-800/50') : (isChecked ? 'bg-blue-50/60' : 'hover:bg-gray-50')} transition-colors`}>
                    <td className="px-3 py-3 text-center">
                      <input 
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleCheckboxChange(item.id)}
                        className="rounded cursor-pointer w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-3 py-3">{idx + 1}</td>
                    <td className="px-4 py-3 flex items-center gap-2">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-blue-500 bg-slate-800 overflow-hidden flex-shrink-0 shadow">
                        <img src={avatarSrc} alt="Foto" className="w-full h-full object-cover" />
                      </div>
                      <span className="font-bold text-xs md:text-sm line-clamp-1">{item.nama}</span>
                    </td>
                    {activeTab === 'siswa' && (
                      <td className="px-4 py-3 font-mono text-[11px] font-semibold text-slate-400">
                        {item.nisn || '-'}
                      </td>
                    )}
                    {activeTab === 'guru' && (
                      <td className="px-4 py-3 font-mono text-[11px] font-semibold text-blue-400">
                        {item.kodeGuru || '-'}
                      </td>
                    )}
                    <td className="px-4 py-3">
                      <div className="font-semibold text-blue-500">{item.jabatan_kelas}</div>
                      {activeTab === 'siswa' && (
                        <div className="text-[10px] text-slate-400 font-medium">{item.programKeahlian}</div>
                      )}
                    </td>
                    {activeTab === 'siswa' && (
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] md:text-xs font-bold ${
                          item.statusAktifTP === 'Aktif' ? 'bg-green-500/10 text-green-400 border border-green-500/30' : 'bg-red-500/10 text-red-400 border border-red-500/30'
                        }`}>
                          {item.statusAktifTP}
                        </span>
                      </td>
                    )}
                    <td className="px-4 py-3 font-mono text-[11px]">{item.rfid}</td>
                    <td className="px-4 py-3 text-right flex items-center justify-end gap-1.5">
                      <button onClick={() => setSelectedPersonHistory(item)} title="Lihat Riwayat" className={`p-1.5 ${isDarkMode ? 'bg-blue-950 text-blue-300 hover:bg-blue-900' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'} rounded-lg transition cursor-pointer`}><Eye size={16} /></button>
                      <button onClick={() => handleOpenEdit(item)} className="p-1.5 text-gray-400 hover:text-blue-500 rounded-lg transition cursor-pointer"><Pencil size={16} /></button>
                      <button onClick={() => handleDelete(item.id)} className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg transition cursor-pointer"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-12 text-gray-400 italic">Belum ada data warga sekolah. Silakan lakukan import massal atau tambah data baru.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL KELOLA DAFTAR KELAS & KEAHLIAN MASTER */}
      {isKelasModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className={`${isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white text-gray-800'} w-full max-w-lg rounded-2xl shadow-xl overflow-hidden`}>
            <div className={`flex justify-between p-6 border-b ${isDarkMode ? 'border-slate-800' : 'border-gray-100'}`}>
              <h3 className="font-bold text-base flex items-center gap-2">
                <Layers className="text-blue-600" /> Kelola Master Kelas & Program Keahlian
              </h3>
              <button onClick={() => setIsKelasModalOpen(false)} className="cursor-pointer"><X size={20}/></button>
            </div>
            
            <div className="p-6 space-y-4">
              <form onSubmit={handleAddKelasMaster} className="space-y-3 bg-slate-800/40 p-4 rounded-xl border border-slate-700/60">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Nama Kelas</label>
                    <input 
                      type="text" 
                      required 
                      value={inputNamaKelas} 
                      onChange={(e) => setInputNamaKelas(e.target.value)} 
                      className={`w-full border rounded-lg p-2 text-xs uppercase ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : ''}`} 
                      placeholder="Contoh: X TITL" 
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Konsentrasi Keahlian</label>
                    <input 
                      type="text" 
                      required 
                      value={inputKeahlian} 
                      onChange={(e) => setInputKeahlian(e.target.value)} 
                      className={`w-full border rounded-lg p-2 text-xs ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : ''}`} 
                      placeholder="Contoh: Teknik Ketenagalistrikan" 
                    />
                  </div>
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-xs font-semibold cursor-pointer shadow transition">Tambah Kelas Baru</button>
              </form>

              <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
                <p className={`text-xs font-semibold ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Daftar Kelas & Kejuruan Terdaftar:</p>
                {daftarMasterKelas.length > 0 ? (
                  daftarMasterKelas.map((item, idx) => (
                    <div key={idx} className={`flex justify-between items-center p-2.5 rounded-xl border ${isDarkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-gray-50 border-gray-200'}`}>
                      <div>
                        <span className="font-bold text-sm text-blue-400">{item.nama}</span>
                        <p className="text-[11px] text-slate-400">{item.keahlian}</p>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => handleDeleteKelasMaster(item.nama)}
                        className="text-gray-400 hover:text-red-500 transition cursor-pointer p-1"
                        title="Hapus Kelas"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-400 text-center py-4">Belum ada daftar kelas. Silakan tambahkan di atas.</p>
                )}
              </div>
            </div>

            <div className={`p-4 border-t ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-gray-50'} flex justify-end`}>
              <button onClick={() => setIsKelasModalOpen(false)} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium cursor-pointer">Selesai</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL TAMBAH / EDIT DATA SISWA & GURU */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className={`${isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white text-gray-800'} w-full max-w-md rounded-2xl shadow-xl overflow-hidden`}>
            <div className={`flex justify-between p-6 border-b ${isDarkMode ? 'border-slate-800' : 'border-gray-100'}`}>
              <h3 className="font-bold text-base flex items-center gap-2">
                <Camera className="text-blue-600" /> {modalMode === 'add' ? 'Tambah Data Baru' : 'Edit Data Warga Sekolah'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="cursor-pointer"><X size={20}/></button>
            </div>
            <form onSubmit={handleSaveData}>
              <div className="p-6 space-y-4">
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-20 h-20 rounded-full border-2 border-blue-500 overflow-hidden bg-slate-800 shadow">
                    <img src={formData.foto || getAvatarUrl(formData.nama || 'User')} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <label className={`block text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'} uppercase tracking-wider`}>Unggah Foto Profil</label>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={processAndSetPhoto}
                    className={`block w-full text-xs ${isDarkMode ? 'text-slate-300' : 'text-slate-600'} file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer border ${isDarkMode ? 'border-slate-700 bg-slate-800' : 'border-gray-200 bg-gray-50'} rounded-lg`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'} uppercase tracking-wider mb-1`}>Nama Lengkap</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.nama} 
                    onChange={(e) => {
                      const newName = e.target.value;
                      const dynamicAvatar = getAvatarUrl(newName || 'User');
                      setFormData(prev => ({
                        ...prev, 
                        nama: newName,
                        foto: (prev.foto && prev.foto.startsWith('data:image')) ? prev.foto : dynamicAvatar
                      }));
                    }} 
                    className={`w-full border rounded-lg p-2.5 text-sm ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : ''}`} 
                    placeholder="Nama lengkap beserta gelar..." 
                  />
                </div>

                {activeTab === 'siswa' ? (
                  <div>
                    <label className={`block text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'} uppercase tracking-wider mb-1`}>Nomor NISN</label>
                    <input 
                      type="text" 
                      value={formData.nisn} 
                      onChange={(e) => setFormData({...formData, nisn: e.target.value})} 
                      className={`w-full border rounded-lg p-2.5 text-sm ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : ''}`} 
                      placeholder="Contoh: 0081234567" 
                    />
                  </div>
                ) : (
                  <div>
                    <label className={`block text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'} uppercase tracking-wider mb-1`}>Kode Guru / Nomor Pengenal</label>
                    <input 
                      type="text" 
                      required
                      value={formData.kodeGuru} 
                      onChange={(e) => setFormData({...formData, kodeGuru: e.target.value})} 
                      className={`w-full border rounded-lg p-2.5 text-sm ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : ''}`} 
                      placeholder="Contoh: GURU-001" 
                    />
                  </div>
                )}
                
                <div>
                  <label className={`block text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'} uppercase tracking-wider mb-1`}>
                    {activeTab === 'guru' ? 'Jabatan / Tugas' : `Kelas untuk TP ${tahunPelajaranAktif}`}
                  </label>
                  
                  {activeTab === 'guru' ? (
                    <input type="text" required value={formData.jabatan_kelas} onChange={(e) => setFormData({...formData, jabatan_kelas: e.target.value})} className={`w-full border rounded-lg p-2.5 text-sm ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : ''}`} placeholder="Jabatan guru..." />
                  ) : (
                    <select 
                      required 
                      value={formData.jabatan_kelas} 
                      onChange={(e) => setFormData({...formData, jabatan_kelas: e.target.value})} 
                      className={`w-full border rounded-lg p-2.5 text-sm ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white'}`}
                    >
                      {daftarMasterKelas.length > 0 ? (
                        daftarMasterKelas.map((kelasItem) => (
                          <option key={kelasItem.nama} value={kelasItem.nama} className="bg-slate-900 text-white">
                            {kelasItem.nama} — ({kelasItem.keahlian})
                          </option>
                        ))
                      ) : (
                        <option value="">Belum ada kelas master. Tambahkan dulu di menu 'Kelola Kelas'</option>
                      )}
                    </select>
                  )}
                </div>

                <div>
                  <label className={`block text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'} uppercase tracking-wider mb-1`}>Nomor RFID / Kode QR (Opsional)</label>
                  <input type="text" value={formData.rfid} onChange={(e) => setFormData({...formData, rfid: e.target.value})} className={`w-full border rounded-lg p-2.5 text-sm uppercase ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : ''}`} placeholder="Kosongkan agar otomatis" />
                </div>
              </div>

              <div className={`p-6 border-t ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-gray-50'} flex justify-end gap-3 rounded-b-2xl`}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg text-sm cursor-pointer">Batal</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg flex gap-2 text-sm font-medium cursor-pointer"><CheckCircle size={18}/> Simpan Data</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedPersonHistory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className={`${isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white text-gray-800'} w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]`}>
            <div className="bg-blue-600 p-6 text-white flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 rounded-2xl border-2 border-white/40 overflow-hidden flex items-center justify-center shadow">
                  <img src={selectedPersonHistory.foto || getAvatarUrl(selectedPersonHistory.nama)} alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{selectedPersonHistory.nama}</h3>
                  <p className="text-xs text-blue-100">{selectedPersonHistory.jabatan_kelas} &bull; ID/QR: {selectedPersonHistory.rfid}</p>
                </div>
              </div>
              <button onClick={() => setSelectedPersonHistory(null)} className="text-white/80 hover:text-white p-2 rounded-lg bg-white/10 hover:bg-white/20 transition cursor-pointer"><X size={20}/></button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              <h4 className="font-bold text-sm uppercase tracking-wider">Riwayat Rekam Kehadiran ({tahunPelajaranAktif})</h4>
              {personalLogs.length > 0 ? (
                <div className={`border rounded-xl overflow-hidden ${isDarkMode ? 'border-slate-800' : ''}`}>
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className={`${isDarkMode ? 'bg-slate-800 text-slate-400 border-slate-700' : 'bg-gray-50 text-gray-500 border-b'} text-xs uppercase`}><th className="px-4 py-3">Tanggal</th><th className="px-4 py-3">Datang</th><th className="px-4 py-3">Pulang</th><th className="px-4 py-3">Status</th></tr>
                    </thead>
                    <tbody className={`divide-y ${isDarkMode ? 'divide-slate-800' : 'divide-gray-100'} text-sm`}>
                      {personalLogs.map((log) => (
                        <tr key={log.id} className={`${isDarkMode ? 'hover:bg-slate-800/50' : 'hover:bg-gray-50'}`}>
                          <td className="px-4 py-3 font-medium">{log.tanggal}</td>
                          <td className="px-4 py-3 text-green-500 font-medium">{log.waktuDatang}</td>
                          <td className="px-4 py-3 text-orange-500 font-medium">{log.waktuPulang || '-'}</td>
                          <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded text-xs font-bold ${log.status === 'Terlambat' ? 'bg-red-500/10 text-red-400 border border-red-500/30' : 'bg-green-500/10 text-green-400 border border-green-500/30'}`}>{log.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-400 space-y-2"><Clock size={48} className="mx-auto opacity-30" /><p className="font-medium">Belum ada catatan riwayat kehadiran untuk TP {tahunPelajaranAktif}.</p></div>
              )}
            </div>
            <div className={`p-4 border-t ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-gray-50'} flex justify-end`}>
              <button onClick={() => setSelectedPersonHistory(null)} className="px-5 py-2 bg-gray-800 text-white rounded-xl text-sm font-medium cursor-pointer">Tutup</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ==============================================================
   15. KOMPONEN PENDUKUNG
============================================================== */
const MenuItem = ({ id, icon: Icon, label, activeMenu, onClick, isDarkMode }) => (
  <li>
    <button 
      onClick={() => onClick(id)} 
      className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-r-lg transition-colors text-left cursor-pointer ${
        activeMenu === id 
          ? `${isDarkMode ? 'text-blue-400 bg-blue-950/50 border-blue-500' : 'text-blue-700 bg-blue-50 border-blue-600'} border-l-4 font-medium` 
          : `${isDarkMode ? 'text-slate-400 hover:bg-slate-800/50' : 'text-gray-600 hover:bg-gray-100'}`
      }`}
    >
      <Icon size={18} />
      <span>{label}</span>
    </button>
  </li>
);
};