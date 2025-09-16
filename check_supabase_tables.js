// Script para verificar las tablas en Supabase
import { createClient } from '@supabase/supabase-js';

// Configuración de Supabase
const supabaseUrl = 'https://slrzlggigpiinswjfvxr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNscnpsZ2dpZ3BpaW5zd2pmdnhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4NTkyOTQsImV4cCI6MjA3MzQzNTI5NH0.sIx1NtdC92TJYOumnDPs-J6zDFz6vjQamOmfxa0AK5c';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTables() {
  try {
    console.log('🔍 Verificando tablas en Supabase...');
    
    // Verificar tabla landing_phones
    console.log('\n📋 Tabla landing_phones:');
    const { data: landingPhones, error: landingError } = await supabase
      .from('landing_phones')
      .select('*')
      .order('landing_number');
    
    if (landingError) {
      console.error('❌ Error al consultar landing_phones:', landingError.message);
    } else {
      console.log(`✅ Encontrados ${landingPhones.length} registros en landing_phones`);
      landingPhones.forEach(item => {
        console.log(`  Landing ${item.landing_number}: ${item.individual_title || item.description || 'Sin título'} (${item.is_active ? 'Activo' : 'Inactivo'})`);
      });
    }
    
    // Verificar tabla global_links
    console.log('\n🔗 Tabla global_links:');
    const { data: globalLinks, error: globalError } = await supabase
      .from('global_links')
      .select('*')
      .order('id');
    
    if (globalError) {
      console.error('❌ Error al consultar global_links:', globalError.message);
    } else {
      console.log(`✅ Encontrados ${globalLinks.length} registros en global_links`);
      globalLinks.forEach(item => {
        console.log(`  ${item.name}: ${item.url} (${item.is_active ? 'Activo' : 'Inactivo'})`);
      });
    }
    
    // Verificar tabla landing_links
    console.log('\n🎯 Tabla landing_links:');
    const { data: landingLinks, error: linksError } = await supabase
      .from('landing_links')
      .select('*')
      .order('landing_number');
    
    if (linksError) {
      console.error('❌ Error al consultar landing_links:', linksError.message);
    } else {
      console.log(`✅ Encontrados ${landingLinks.length} registros en landing_links`);
      const groupedLinks = landingLinks.reduce((acc, item) => {
        if (!acc[item.landing_number]) acc[item.landing_number] = [];
        acc[item.landing_number].push(item);
        return acc;
      }, {});
      
      Object.entries(groupedLinks).forEach(([landingNum, links]) => {
        console.log(`  Landing ${landingNum}: ${links.length} enlaces`);
      });
    }
    
    console.log('\n🎉 Verificación completada!');
    
  } catch (error) {
    console.error('❌ Error general:', error.message);
  }
}

checkTables();