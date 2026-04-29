@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    @apply bg-surface-100 text-gray-800 font-sans;
    font-size: 15px;
    line-height: 1.6;
  }

  h1, h2, h3 {
    @apply font-display font-normal tracking-tight text-gray-900;
  }

  h4, h5, h6 {
    @apply font-sans font-semibold text-gray-800;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { @apply bg-surface-200; }
  ::-webkit-scrollbar-thumb { @apply bg-surface-400 rounded-full; }
  ::-webkit-scrollbar-thumb:hover { @apply bg-primary-300; }
}

@layer components {
  /* ── Buttons ──────────────────────────────────────── */
  .btn {
    @apply inline-flex items-center justify-center gap-2 font-medium rounded-lg
           transition-all duration-150 cursor-pointer select-none
           focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2
           disabled:opacity-50 disabled:cursor-not-allowed;
  }
  .btn-sm  { @apply btn text-sm px-3 py-1.5; }
  .btn-md  { @apply btn text-sm px-4 py-2; }
  .btn-lg  { @apply btn text-base px-5 py-2.5; }

  .btn-primary {
    @apply bg-primary-700 text-white hover:bg-primary-800 active:bg-primary-900 shadow-sm;
  }
  .btn-secondary {
    @apply bg-white text-gray-700 border border-surface-300 hover:bg-surface-50 active:bg-surface-100 shadow-sm;
  }
  .btn-accent {
    @apply bg-accent-500 text-white hover:bg-accent-600 active:bg-accent-700 shadow-sm;
  }
  .btn-ghost {
    @apply text-gray-600 hover:bg-surface-200 active:bg-surface-300;
  }
  .btn-danger {
    @apply bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-sm;
  }

  /* ── Cards ────────────────────────────────────────── */
  .card {
    @apply bg-white rounded-xl border border-surface-200 shadow-card;
  }
  .card-md {
    @apply bg-white rounded-xl border border-surface-200 shadow-card-md;
  }

  /* ── Form elements ───────────────────────────────── */
  .input {
    @apply w-full px-3.5 py-2.5 bg-white border border-surface-300 rounded-lg text-sm
           text-gray-800 placeholder-gray-400
           focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
           transition-colors duration-150;
  }
  .input-error {
    @apply border-red-400 focus:ring-red-400 focus:border-red-400;
  }
  .label {
    @apply block text-sm font-medium text-gray-700 mb-1.5;
  }
  .select {
    @apply input appearance-none bg-no-repeat pr-8;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E");
    background-position: right 0.75rem center;
    background-size: 1rem;
  }

  /* ── Badges ──────────────────────────────────────── */
  .badge {
    @apply inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full;
  }
  .badge-ee { @apply badge bg-green-100 text-green-800; }
  .badge-me { @apply badge bg-blue-100  text-blue-800; }
  .badge-ae { @apply badge bg-yellow-100 text-yellow-800; }
  .badge-be { @apply badge bg-red-100  text-red-800; }

  /* ── Role colour chips ───────────────────────────── */
  .role-superadmin { @apply bg-purple-100 text-purple-800; }
  .role-admin      { @apply bg-primary-100 text-primary-800; }
  .role-teacher    { @apply bg-blue-100 text-blue-800; }
  .role-student    { @apply bg-accent-100 text-accent-800; }
  .role-parent     { @apply bg-pink-100 text-pink-800; }
  .role-supplier   { @apply bg-gray-100 text-gray-700; }

  /* ── Page shell ──────────────────────────────────── */
  .page-title {
    @apply text-2xl font-display text-gray-900;
  }
  .page-subtitle {
    @apply text-sm text-gray-500 mt-0.5;
  }

  /* ── Sidebar nav item ────────────────────────────── */
  .nav-item {
    @apply flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
           transition-all duration-150 cursor-pointer select-none;
  }
  .nav-item-active {
    @apply bg-primary-700 text-white shadow-sm;
  }
  .nav-item-inactive {
    @apply text-primary-100 hover:bg-primary-800/60 hover:text-white;
  }

  /* ── Stat card ───────────────────────────────────── */
  .stat-card {
    @apply card p-5 flex flex-col gap-1;
  }
  .stat-value {
    @apply text-3xl font-display text-gray-900;
  }
  .stat-label {
    @apply text-sm text-gray-500;
  }
  .stat-change-up   { @apply text-xs text-green-600 font-medium; }
  .stat-change-down { @apply text-xs text-red-500 font-medium; }

  /* ── Table ───────────────────────────────────────── */
  .table-wrap {
    @apply w-full overflow-x-auto;
  }
  .table {
    @apply w-full text-sm text-left border-collapse;
  }
  .table thead tr {
    @apply bg-surface-100 border-b border-surface-300;
  }
  .table th {
    @apply px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide;
  }
  .table tbody tr {
    @apply border-b border-surface-200 hover:bg-surface-50 transition-colors duration-100;
  }
  .table td {
    @apply px-4 py-3 text-gray-700;
  }

  /* ── Divider ─────────────────────────────────────── */
  .divider {
    @apply border-t border-surface-200 my-4;
  }
}

/* ── Loading spinner ─────────────────────────────── */
.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top-color: currentColor;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ── Auth page background pattern ───────────────── */
.auth-bg {
  background-color: #14402e;
  background-image:
    radial-gradient(ellipse at 20% 50%, rgba(30, 120, 82, 0.4) 0%, transparent 60%),
    radial-gradient(ellipse at 80% 20%, rgba(245, 158, 11, 0.15) 0%, transparent 50%);
}
