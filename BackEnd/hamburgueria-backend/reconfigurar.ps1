# Parar o servidor caso esteja rodando
Stop-Process -Name "python" -ErrorAction SilentlyContinue

# Deletar db.sqlite3 se existir
if (Test-Path "db.sqlite3") {
    Remove-Item "db.sqlite3" -Force
    Write-Host "Arquivo db.sqlite3 removido"
}

# Remover arquivos .py em pastas de migrations (exceto __init__.py)
Get-ChildItem -Recurse -Include *.py -Path . -Filter migrations | Where-Object { $_.Name -ne '__init__.py' } | Remove-Item -Force

# Remover arquivos .pyc também
Get-ChildItem -Recurse -Include *.pyc -Path . | Remove-Item -Force

# Fazer as migrações novamente
python manage.py makemigrations
python manage.py migrate